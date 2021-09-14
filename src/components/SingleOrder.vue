<template>
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
</template>

<script>
export default {
  name: "SingleOrder",
  props: {
    order: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  background: whitesmoke;
  font-weight: bold;

&__name {
   padding: 1rem;
   color: var(--secondary);
   font-size: 1.5rem;
   flex: 1;
 }

&__details {
   padding: 0.5rem 1rem;
   display: flex;
   flex-flow: column;
   gap: 1rem;
   color: white;
   background: var(--secondary-dark);

&--content {
   display: flex;
   gap: 1rem;
 }
}
}

</style>
