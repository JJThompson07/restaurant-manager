<template>
  <div class="page page--orders">
    <h1 class="page__title">All Orders</h1>
    <div v-if="orders.items" class="list list--v">
      <div class="list__filter">
        <div class="list__filter--search">
          <input id="searchGuests" type="search" v-model="search">
          <label for="searchGuests">
            <span class="material-icons">search</span>
          </label>
        </div>
      </div>
      <div class="all-orders">
        <div
            class="order order__top"
        >
          <div class="order__id">
            Order
          </div>
          <div class="order__name">
            Details
          </div>
          <div class="order__details">
            <div class="order__quantity">
              Qty
            </div>
            <div class="order__price">
              Price
            </div>
            <div></div>
          </div>
        </div>
        <div
            v-for="order in filteredOrders"
            :key="order.id"
            class="order"
            @click="getOrder(order.id)">
          <div class="order__id">
            {{ order.id }}
          </div>
          <div class="order__name">
            {{ order.name }}
          </div>
          <div class="order__details">
            <div class="order__quantity">
              {{ order.quantity }}
            </div>
            <div class="order__price">
              £{{ order.price }}
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="err" class="error">{{ err }}</div>
    <Loader v-if="!err && !orders.items" />
  </div>

</template>

<script>
import getGuestsOrders from '../composables/getGuestsOrders'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: "Orders",
  setup() {
    const router = useRouter()
    const search = ref('')
    const { orders, err } = getGuestsOrders()

    const filteredOrders = computed( () => {
      return orders.value.items.filter((order) => {
        let searched = true
        const name = order.name.toLowerCase()
        if (search.value.length > 0) {
          searched = name.includes(search.value.toLowerCase())
        }
        return searched
      })
    })

    const getOrder = (id) => {
      router.push({name: 'Order', params: { id: id }})
    }

    return {
      orders,
      err,
      search,
      filteredOrders,
      getOrder
    }
  }
}
</script>

<style scoped lang="scss">
.all-orders {
  display: flex;
  flex-flow: column;

  .order {
    display: flex;
    gap: 1rem;
    background: var(--muted-light);
    margin-bottom: 0.5rem;

    &__id {
      padding: 0 1rem;
      width: 53px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__name {
      font-size: 1.1rem;
      flex: 10;
      padding: 1rem;
    }

    &__details {
      display: flex;
      gap: 1rem;
      font-size: 1.1rem;
      flex: 2;
      justify-content: space-between;
      align-items: center;

      &__quantity,
      &__price {
        flex: 1;
      }
    }

    &__top {
      font-size: 1.25rem;
      background: white;
      margin-bottom: 0;
      border-bottom: solid 2px var(--muted);
    }
  }
}

</style>
