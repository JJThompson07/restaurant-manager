<template>
  <div class="page page--order">
    <h2 v-if="order" class="page__title">Order {{ order.id }}</h2>
    <div class="details">
      <div v-if="guest">
        <div class="details__title">
          Order Details
        </div>
        <div class="details__content">
          <div class="details__name">
            <div class="details__label">
              Ordered by:
            </div>
            {{ guest.first_name }} {{ guest.last_name }}
            <span class="material-icons" :class="'icon--' + guest.gender.toLowerCase()">{{ guest.gender.toLowerCase() }}</span>
          </div>
          <div class="details__date">
            <div class="details__label">
              Order Date:
            </div>
            {{ formatDate(guest.visited) }}
          </div>
        </div>
      </div>
      <div v-else class="error">
        No information on the guest that purchased this order can be found.
      </div>
    </div>
    <SingleOrder v-if="order" :order="order" />
    <div v-if="err" class="error">{{ err }}</div>
    <Loader v-if="!err && !order" />
  </div>
</template>

<script>
import getGuestsOrders from '../composables/getGuestsOrders'
import getGuests from '../composables/getGuests'
import { format } from 'date-fns'
import { computed, ref } from 'vue'
import SingleOrder from '../components/SingleOrder'
export default {
  name: "Order",
  components: { SingleOrder },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { orders, err } = getGuestsOrders()
    const { guests, error } = getGuests()

    const order = computed(() => {
      return orders.value.items.find((item) => {
        return item.id == props.id
      })
    })

    const guest = computed(() => {
      return guests.value.items.find((item) => {
        return item.id == order.value.guest_id
      })
    })

    const formatDate = (date) => {
      return format(new Date(date), 'do LLL yyyy')
    }

    return {
      err,
      error,
      order,
      guest,
      formatDate
    }

  }
}
</script>

<style lang="scss">
.details {
  padding: 2rem 0;
  font-size: 1.25rem;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  width: max-content;

  &__title {
    font-size: 1.5rem;
    padding: 0.5rem 0;
    color: var(--muted-dark)
  }

  &__content {
    padding: 1rem;
    background-color: whitesmoke;
  }

  &__name,
  &__date {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem
  }

  &__label {
    font-size: 1rem;
  }
}
</style>
