import axios from 'axios'

const actions = {
   sampleAction({ commit }) {
       const article = { title: "FIRST"}
        axios.post('http://localhost:3000/first', article)
            .then(response => {               
                commit('SAMPLE_MUTATION', response.data)
            })
    },
    nextAction({ commit }, data) {
        const article = { title: "NEXT", dir: data}
        axios.post('http://localhost:3000/next', article)
            .then(response => {               
                commit('SAMPLE_MUTATION', response.data)
            })
    },
    updateCounter ({commit}, count) {
        commit('COUNT_MUTATUIN', count)
    },
    updateThissong ({commit}, song) {
        commit('THISSONG_MUTATUIN', song)
    },
    updateDiv ({commit}, div) {
        commit('DIV_MUTATUIN', div)
    },
}

export default actions