<template>
  <div class="page page--guest">
    <h2 v-if="guest" class="page__title">{{ guest.first_name }} {{ guest.last_name }}</h2>
    <div v-if="guest" class="guest">
      <div class="guest__title">Guest Info</div>
      <div class="guest__content">
        <div class="guest__visited">
          <div class="guest__label">
            Visited:
          </div>
          <div class="guest__value">
            {{ formatDate(guest.visited) }}
          </div>
        </div>
        <div class="guest__email">
          <div class="guest__label">
            Contact info:
          </div>
          <div class="guest__value">
            <span class="material-icons">email</span>
            {{ guest.email }}
          </div>
        </div>
        <div class="guest__gender">
          <div class="guest__label">
            Gender:
          </div>
          <div class="guest__value">
            {{ guest.gender }}
            <span class="material-icons" :class="'icon--' + guest.gender.toLowerCase()">{{ guest.gender.toLowerCase() }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="order" class="orders">
      <div class="orders__title">Orders</div>
      <div class="order">
        <div class="order__name">
          {{ order.name }}

        </div>
        <div class="order__details">
          <div class="order__details--title">
            Order Details
          </div>
          <div class="order__details--content">
            <div class="order__id">
                  <span class="small">
                    Order ID:
                  </span>
              {{ order.id }}
            </div>
            <div class="order__quantity">
                  <span class="small">
                    Quantity:
                  </span>
              {{ order.quantity }}
            </div>
            <div class="order__price">
                  <span class="small">
                    Price:
                  </span>
              £{{ order.price }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <Loader v-if="!error && !guest" />
  </div>
</template>

<script>
import getGuestsOrders from '../composables/getGuestsOrders'
import getGuests from '../composables/getGuests'
import { computed } from 'vue'
import { format } from 'date-fns'

export default {
  name: "Guest",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { guests, error } = getGuests()
    const { orders, err } = getGuestsOrders()


    const guest = computed(() => {
      return guests.value.items.find((item) => {
        return item.id == props.id
      })
    })

    const order = computed(() => {
      return orders.value.items.find((item) => {
        return item.guest_id == guest.value.id
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

<style lang="scss" scoped>
.guest {
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

  &__visited,
  &__email,
  &__gender {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem
  }

  &__label {
    font-size: 1rem;
  }
  &__value {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
.orders {
  &__title {
    padding: 0.5rem 0;
    font-size: 1.5rem;
    color: var(--muted-dark);
  }
}
</style>
