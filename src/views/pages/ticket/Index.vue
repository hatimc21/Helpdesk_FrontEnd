<template>
  <b-card class="my-3">
    <b-card-header class="d-flex justify-content-between">
      <h3>Tickets</h3>
      <div class="d-flex justify-content-between">
        <!-- Begin:: Button Entry  -->
        <div v-if="isTimeEntryForm">
          <b-button
            type="button"
            v-b-tooltip.hover
            :title="isEditFormTimeEntry ? 'Edit time entry' : 'Save time entry'"
            :variant="
              isEditFormTimeEntry ? 'outline-warning' : 'outline-primary'
            "
            @click="onSubmitTimeEntry"
            class="mx-1"
            >{{ isEditFormTimeEntry ? "Edit" : "Save" }}</b-button
          >
        </div>
        <!-- end:: Button Entry  -->
        <!-- Begin:: Button ticket form  -->
        <div v-else>
          <!--add-->
          <b-button
            v-if="isAdd"
            type="button"
            variant="outline-success"
            v-b-tooltip.hover
            title="Add a new ticket"
            @click="add()"
            class="mx-1"
            >Add</b-button
          >
          <!-- save button-->
          <b-button
            v-else
            type="button"
            v-b-tooltip.hover
            :title="isEditForm ? 'Edit ticket' : 'Save ticket'"
            :variant="isEditForm ? 'outline-warning' : 'outline-primary'"
            v-on:click="onSubmit"
            class="mx-1"
            >{{ isEditForm ? "Edit" : "Save" }}</b-button
          >
        </div>
        <div>
          <b-button
            type="button"
            variant="outline-danger"
            v-b-tooltip.hover
            title="Cancel"
            @click="onCancel"
          >
            Cancel
          </b-button>
        </div>
        <!-- end:: Button ticket form  -->
      </div>
    </b-card-header>
    <!-- Begin:: Time Entry Form -->
    <div v-if="isTimeEntryForm">
      <TimeEntryForm
        ref="TimeEntryForm"
        :ticket="ticketInformation"
        :isEditFormTimeEntry="isEditFormTimeEntry"
      />
    </div>
    <!-- End:: Time Entry Form -->

    <!-- Begin:: Form Ticket -->
    <div v-else>
      <fieldset class="m-1 border-dark" v-if="!isAdd">
        <legend>Form Ticket</legend>
        <!-- begin:: form   -->
        <form ref="formEmployee" @submit.stop.prevent="onSubmit" class="my-2">
          <b-row>
            <b-col xl="3">
              <b-form-group
                label="Ticket Name:"
                label-for="title"
                invalid-feedback="Subject is required"
              >
                <b-form-input
                  id="title"
                  type="text"
                  v-model.trim="title"
                >
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col xl="3">
              
            </b-col>

            <b-col xl="6">
             
            </b-col>
          </b-row>
        
           
          <b-row>
            <b-col sm="12">
              <b-form-textarea
                id="description"
                v-model.trim="description"
                placeholder="Description"
                rows="3"
              ></b-form-textarea>
            </b-col>
          </b-row>
        </form>
        <!-- end:: form   -->
      </fieldset>
    </div>
    <!-- End:: Form Ticket -->

    <!-- begin::Table List Of Tickets -->
    <TableListOfTickets
      @showTicketInformation="showTicketInformation"
      @showTimeEntryForm="showTimeEntryForm"
      class="my-2"
      @editTicket="editTicket"
      ref="TableListOfTickets"
      :tickets="tickets"
    />
    <!-- end::Table List Of Tickets -->

    <!-- begin::Modal Ticket Information -->
    <ModalTicketInformation
      @freshDataTimeEntryAndAssignedEmployee="
        freshDataTimeEntryAndAssignedEmployee
      "
      @editTimeEntry="editTimeEntry"
      :ticket="ticketInformation"
      ref="ModalTicketInformation"
    />
    <!-- end:: Modal Ticket Information -->
  </b-card>
</template>

<script>
import axios from "axios";
import globalMixin from "@/core/mixins/global-mixin";
import moment from "moment";
import configMessage from "@/core/config/config-message-swall";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapState } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Ticket",
  mixins: [validationMixin, globalMixin],
  components: {
    TableListOfTickets: () =>
      import("@/components/tables/table-list-of-tickets/TableListOfTickets"),
    
    ModalTicketInformation: () =>
      import("@/components/modals/ModalTicketInformation"),
    TimeEntryForm: () => import("@/components/form/TimeEntryForm"),
  },
  created() {
    this.$store.dispatch("ticket/getListOfTickets");
    this.$store.dispatch("employee/getListOfEmployees");
    this.$store.dispatch("category/getListOfCategories");
    this.$store.dispatch("status/getListOfStatuses");
    this.$store.dispatch("priority/getListOfPriorities");
    this.$store.dispatch("kind/getListOfKinds");
  },
  computed: {
    ...mapState("category", {
      categories: (state) =>
        state.categories.map((item) =>
          Object.assign({}, { value: item.id, text: item.name })
        ),
    }),
    ...mapState("status", {
      statuses: (state) =>
        state.statues.map((item) =>
          Object.assign({}, { value: item.id, text: item.name })
        ),
    }),
    ...mapState("priority", {
      priorities: (state) =>
        state.priorities.map((item) =>
          Object.assign({}, { value: item.id, text: item.name })
        ),
    }),
    ...mapState("kind", {
      kinds: (state) =>
        state.kinds.map((item) =>
          Object.assign({}, { value: item.id, text: item.name })
        ),
    }),
    ...mapState("ticket", {
      tickets: (state) => state.tickets,
    }),
    ...mapState("employee", {
      employees: (state) =>
        state.employees.map((item) =>
          Object.assign(
            {},
            { id: item.id, name: `${item.first_name} ${item.last_name}` }
          )
        ),
    }),
  },
  validations() {
    if (this.isEditForm) {
      return {
        form: {
          date: {
            required,
          },
          title: {
            required,
          },
          employees: {
            required,
          },
          selectedCategories: {
            required,
          },
          selectedStatus: {
            required,
          },
          selectedPriorities: {
            required,
          },
          selectedKind: {
            required,
          },
        },
      };
    }
    return {
      form: {
        date: {
          required,
        },
        title: {
          required,
        },
        employees: {
          required,
        },
        selectedCategories: {
          required,
        },
        selectedStatus: {
          required,
        },
        selectedPriorities: {
          required,
        },
        selectedKind: {
          required,
        },
      },
    };
  },
  data() {
    return {
      description:'',
      title:'',
      isEditForm: false,
      isAdd: true,
      ticketInformation: {},
      isTimeEntryForm: false,
      isEditFormTimeEntry: false,
      form: {
        date: "",
        title: "",
        description: "",
        employees: [],
        selectedCategories: "",
        selectedStatus: "",
        selectedPriorities: "",
        selectedKind: "",
      },
    };
  },
  methods: {
    validateState({ name }) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    onReset() {
      this.$nextTick(() => {
        this.$v.$reset();
      });
      this.form = {
        date: "",
        title: "",
        description: "",
        selectedCategories: "",
        selectedStatus: "",
        selectedPriorities: "",
        selectedKind: "",
      };
      this.isAdd = true;
      this.isEditForm = false;
      this.$refs.TableListOfTickets.refreshData();
      if (this.isTimeEntryForm || this.isEditFormTimeEntry) {
        this.$refs.TimeEntryForm.onReset();
        this.isTimeEntryForm = false;
        this.isEditFormTimeEntry = false;
      }
    },
    onCancel() {
      this.$swal(configMessage.confirm_cancel).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          this.onReset();
          await this.$swal(configMessage.success);
        }
      });
    },
    add() {
      this.isAdd = false;
    },
    async getAssignedTicketsEmployees({ id }) {
      try {
        const { data } = await this.$store.dispatch(
          "ticket/getAssignedTicketsEmployees",
          id
        );
        return data;
      } catch (e) {}
    },
    async getTicketTimeEntry({ id }) {
      try {
        const { data } = await this.$store.dispatch("ticket/getATicket", id);
        return data.entries;
      } catch (e) {}
    },
    async showTicketInformation({ item }) {
      try {
        this.ticketInformation = {};
        const { id } = item;
        this.ticketInformation = await this.getAssignedTicketsEmployees({ id });
        this.ticketInformation.entries = await this.getTicketTimeEntry({ id });
        this.$refs.ModalTicketInformation.modalHandler();
      } catch (e) {
        await this.$swal(configMessage.error);
      }
    },
    async showTimeEntryForm({ item }) {
      try {
        this.ticketInformation = {};
        const { id } = item;
        this.ticketInformation = await this.getAssignedTicketsEmployees({ id });
        this.ticketInformation.employees = this.ticketInformation.employees.map(
          (item) =>
            Object.assign(
              {},
              { id: item.id, name: `${item.first_name} ${item.last_name}` }
            )
        );
        if (!this.isEditFormTimeEntry) {
          this.isTimeEntryForm = true;
        }
      } catch (e) {}
    },
    async onSubmit() {
        const user_id = localStorage.getItem("user-id")
        let result = await axios.post('https://zae1qw.deta.dev/addticket?name_ticket='+title.value+'&description_ticket='+description.value+'&user_id='+user_id
        )
        console.log(result)
      try {
        // valid form
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return null;
        }
        // edit
        if (this.isEditForm) {
          this.$swal(configMessage.confirm_edit).then(
            async ({ isConfirmed }) => {
              if (isConfirmed) {
                try {
                  // this.form.date = moment(this.form.date).format();
                  await this.$store.dispatch("ticket/updateATicket", this.form);
                  await this.$swal(configMessage.update);
                  this.onReset();
                  this.$refs.TableListOfTickets.refreshData();
                  return;
                } catch (e) {
                  await this.$swal(configMessage.error);
                }
              }
            }
          );
          return;
        }
        // save
        await this.$store.dispatch("ticket/createATicket", this.form);
        await this.$swal(configMessage.success);
        this.onReset();
        this.$refs.TableListOfTickets.refreshData();
      } catch (e) {
        await this.$swal(configMessage.error);
      }
    },
    onSubmitTimeEntry() {
      try {
        this.$refs.TimeEntryForm.onSubmit();
        this.isTimeEntryForm = false;
        this.isEditFormTimeEntry = false;
      } catch (e) {
        this.$swal(configMessage.error);
      }
    },
    async editTicket(ticket) {
      await this.$swal(configMessage.confirm_edit).then(async () => {
        const { item } = ticket;
        const { id } = item;
        this.isEditForm = true;
        try {
          const { data } = await this.$store.dispatch(
            "ticket/getAssignedTicketsEmployees",
            id
          );
          this.$nextTick(() => {
            this.isAdd = false;
            this.form.id = data.id;
            this.form.date = moment(data.date, "DD-MM-YYYY").format(
              "YYYY-MM-DD"
            );
            this.form.title = data.title;
            this.form.description = data.description;
            this.form.employees = data.employees.map((item) =>
              Object.assign(
                {},
                { id: item.id, name: `${item.first_name} ${item.last_name}` }
              )
            );
            this.form.selectedCategories = data.category.id;
            this.form.selectedStatus = data.status.id;
            this.form.selectedPriorities = data.priority.id;
            this.form.selectedKind = data.kind.id;
          });
        } catch (e) {
          await this.$swal(configMessage.error);
        }
      });
    },
    freshDataTimeEntryAndAssignedEmployee() {
      this.showTicketInformation({ item: this.ticketInformation });
    },
    editTimeEntry(id) {
      this.isEditFormTimeEntry = true;
      this.isTimeEntryForm = true;
      this.showTimeEntryForm({ item: { id } });
    },
  },
};
</script>

<style scoped></style>
