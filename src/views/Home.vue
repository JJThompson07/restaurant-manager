<template>
  <div class="page page--home">
    <div class="orders-filters">
    <h2 class="orders-filters__title">Select A Date To View Orders</h2>
    <div class="dates">
      <div
          v-for="date in dates"
          :key="date"
          class="date btn"
          :class="{'selected': selectedDate == date}"
          role="button"
          @click="setDate(date)"
      >
        <span class="material-icons">calendar_today</span>
        <span class="date-value">{{ formatDate(date) }}</span>
      </div>
    </div>
    </div>
    <div v-if="selectedDate !== null" class="results">
      <div class="result">
        <div class="result__top" :class="filteredResults.gender.toLowerCase()">
          <span class="result__name">
            <span class="material-icons">
                {{ filteredResults.gender.toLowerCase() }}
            </span>
            {{ filteredResults.first_name }} {{ filteredResults.last_name }}
          </span>
          visited on {{formatDate(selectedDate) }}
        </div>
        <div class="result__about"></div>
        <div v-if="filteredResults.orders.length" class="result__orders">
          <div class="result__orders--intro">
            On {{ filteredResults.gender == 'Male' ? 'his' : 'her' }} visit {{ filteredResults.first_name }} orderd:
          </div>
          <SingleOrder v-for="order in filteredResults.orders" :key="order.id" class="order" :order="order" />
        </div>
        <div v-else class="result__no-orders error">Sadly {{ filteredResults.first_name }} did not place and order on
          {{ filteredResults.gender == 'Male' ? 'his' : 'her' }} visit</div>
      </div>
    </div>
  </div>
</template>

<script>
import getGuests from '../composables/getGuests'
import getGuestsOrders from '../composables/getGuestsOrders'
import { format } from 'date-fns'
import { ref, computed } from 'vue'
import SingleOrder from '../components/SingleOrder'
export default {
  name: 'Home',
  components: { SingleOrder },
  setup() {
    const { guests, error } = getGuests()
    const { orders, err } = getGuestsOrders()
    const selectedDate = ref(null)

    const dates = computed(() => {
      const items = ref([])
      const datesSet = new Set()

      guests.value.items.forEach(guest => {
        datesSet.add(guest.visited)
      })

      items.value = [...datesSet]
      items.value = items.value.sort((a,b) => {
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
      })
      return items.value
    })

    const formatDate = (date) => {
      return format(new Date(date), 'do LLL yyyy')
    }

    const setDate = (date) => {
      selectedDate.value = selectedDate.value === date ? null : date
    }

    const filteredResults = computed(() => {
      let fGuests = guests.value.items.find((guest) => {
        return guest.visited == selectedDate.value
      })
      let fOrders = orders.value.items.filter((order) => {
        return order.guest_id == fGuests.id
      })
      console.log(fGuests)
      console.log(orders.value.items)

      fGuests = {...fGuests, orders: fOrders }

      return fGuests
    })

    return {
      guests,
      error,
      orders,
      err,
      dates,
      selectedDate,
      formatDate,
      setDate,
      filteredResults
    }
  }
}
</script>

<style scoped lang="scss">
 .dates {
   padding: 1rem;
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
   gap: 1rem;

   .date {
     padding: 1rem;
     display: flex;
     gap: 0.5rem;
     justify-content: center;
     align-items: center;
     font-weight: bold;
     box-shadow: 1px 2px 5px rgba(50,50,50,0.3);

     &:hover,
     &:focus,
     &.selected {
       background-color: var(--primary);
       color: white;
     }
   }
 }
 .results {
   padding: 2rem;
   background-color: var(--muted-light);
   border-radius: 0 1rem;

   .result {
     background-color: white;
     border-radius: 0 1rem;
     overflow: hidden;

     &__top {
       font-size: 1.25rem;
       display: flex;
       padding: 1rem;
       justify-content: space-between;
       align-items: center;
       border-bottom: solid 2px var(--secondary-dark);
       color: white;
     }

     &__name {
       font-size: 1.5rem;
       font-weight: bold;
       display: flex;
       align-items: center;
       gap: 0.5rem;
     }

     &__orders,
     &__no-orders {
       padding: 1rem;
       background-color: white;
       display: flex;
       flex-flow: column;
       gap: 1rem;
     }
   }
 }
</style>
