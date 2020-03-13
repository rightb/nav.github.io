const url = 'https://randomuser.me/api/?inc=gender,name,dob,email,picture&results='

export const state = () => ({
	users: {}
})

export const mutations = {
	setUsers(state, users) {
		state.users = users
	},
	uploadUsers(state, newUsers){
		state.users = state.users.concat(newUsers);
	}
}

export const actions = {
	async fetch({commit}) {
		let page = '&page=1'
		let users = await this.$axios.$get(`${url}3${page}`)
		commit('setUsers', users.results) 
	},
	async newList({commit}, {quantity, gender, page, type}) {
		let users = await this.$axios.$get(`${url}${quantity}${gender}`)
		commit(type, users.results)
	},
	async nextPage({commit}, {quantity, gender, page}) {
		let users = await this.$axios.$get(`${url}${quantity}${gender}${page}`)
		commit('setUsers', users.results) 
	},

} 
export const getters = {
	users: s => s.users
}