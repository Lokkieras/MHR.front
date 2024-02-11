import { reactive, toRefs } from 'vue'

const state = reactive({
	loading: false,
})

export default () => {
	const setLoading = (loading: any) => {
		state.loading = loading
	}

	return {
		...toRefs(state),
		setLoading,
	}
}
