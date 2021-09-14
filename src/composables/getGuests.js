import { ref } from 'vue'

const getGuests = () => {
    const guests = ref({items: []})
    const error = ref(null)
    const uri = ref('https://tst-api.feeditback.com/exam.guests')

    const loadGuests = async () => {
        // fetch guests data
        await fetch(uri.value, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-FIB-API-LANGUAGE': 'en_GB',
                'X-FIB-API-AUTH-TYPE': 'exam',
                'X-FIB-API-AUTH-TOKEN': 'F6HCAFVHPEg3"Sw#'
            }
        })
            .then(response => response.json())
            .then(data => guests.value = data)
            .catch(err => error.value = err.message);
    }

    loadGuests()

    return {
        guests,
        error
    }

}

export default getGuests
