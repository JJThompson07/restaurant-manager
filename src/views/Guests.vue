<template>
  <div class="page page--guests">
    <h1 class="page__title">All Guests</h1>
    <div v-if="guests.items" class="list list--v">
      <div class="list__filter">
        <div class="list__filter--search">
          <input id="searchGuests" type="search" v-model="search">
          <label for="searchGuests">
            <span class="material-icons">search</span>
          </label>
        </div>
        <div class="list__filter--gender">
          <div
              class="gender-search btn"
              :class="{ 'male': gender.includes('male') }"
              @click="genderFilter('male')"
          >
            <span class="material-icons">male</span>
          </div>
          <div
              class="gender-search btn"
              :class="{ 'female': gender.includes('female') }"
              @click="genderFilter('female')"
          >
            <span class="material-icons">female</span>
          </div>
        </div>
      </div>
      <div class="guests">
        <div
            v-for="guest in filteredGuests"
            :key="guest.id"
            class="guest"
            :class="guest.gender == 'Male' ? 'male' : 'female'"
            @click="getGuest(guest.id)">
          <div class="gender">
            <span class="material-icons">
              {{ guest.gender.toLowerCase() }}
            </span>
          </div>
          <div class="guest__details">
            <div class="guess__name">
              {{ guest.first_name }} {{ guest.last_name }}
            </div>
            <div class="guest__email">
              {{ guest.email }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <Loader v-if="!error && !guests.items" />
  </div>
</template>

<script>
import getGuests from '../composables/getGuests'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import Loader from '../components/Loader'
export default {
  name: "Guests",
  components: { Loader },
  setup() {
    const router = useRouter()
    const search = ref('')
    const gender = ref([])
    const { guests, error } = getGuests()

    const filteredGuests = computed(() => {
      return guests.value.items.filter((guest) => {
        let searched = true
        const name = guest.first_name + ' ' + guest.last_name
        if (search.value.length > 0) {
          searched = name.toLowerCase().includes(search.value.toLowerCase())
        }
        let gendered = true
        if (gender.value.length > 0) {
          gendered = gender.value.includes(guest.gender.toLowerCase())
        }
        return searched && gendered
      })
    })

    const getGuest = (id) => {
      router.push({ name: 'Guest', params: { id: id } })
    }

    const genderFilter = (filter) => {
      if (gender.value.includes(filter)) {
        gender.value = gender.value.filter((item) => {
          return item !== filter
        })
      } else {
        gender.value.push(filter)
      }
      console.log(gender.value)
    }


    return {
      guests,
      error,
      search,
      gender,
      filteredGuests,
      getGuest,
      genderFilter
    }

  }
}
</script>

<style lang="scss" scoped>
.guests {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.guest {
  border-radius: 0.5rem;
  display: flex;
  overflow: hidden;
  box-shadow: 1px 2px 3px rgba(50,50,50,0.25);
  cursor: pointer;

  &:hover {
   .gender {
     padding-right: 1rem;
   }
  }

  * {
    padding: 0.5rem
  }

  &__details {
    flex: 1;
    font-size: 1.5rem;
  }

  &__email {
    font-size: 0.9rem;
  }

  .gender {
    display: flex;
    align-items: center;
    transition: padding-right 0.4s ease-in-out;
  }
}

</style>
