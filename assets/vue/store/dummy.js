import DummyAPI from './api/dummy'

export default {
    namespaced: true,
     state: {
        isLoading: false,
        error: false,
        data: []
     },
     getters: {
        isLoading(state) {
            return state.isLoading
        },
        error(state) {
            return state.error
        },
        data(state) {
            return state.data
        }
     },
     mutations: {
        ['fetching_data'](state) {
            state.isLoading = true,
            state.error = null,
            state.data = []
        },
        ['fetching_data_success'](state, data) {
            state.isLoading = false,
            state.error = null,
            state.data = data
        },
        ['fetching_data_error'](state, error) {
            state.isLoading = false,
            state.error = error,
            state.data = []
        }
     },
     actions: {
        async find({ commit }) {
            commit('fetching_data')
            try {
                let response = await DummyAPI.get()
                commit('fetching_data_success', response.data)
                return response.data
            } catch (error) {
                commit('fetching_data_error', error)
                return null
            }
        }
     }
}