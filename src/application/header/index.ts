import { reactive, toRefs } from 'vue'

const state = reactive({
	message: "",
	additionalMsg: ""
})

export default () => {
	const setHeaderMessage = (msg: string) => {
		state.message = msg
	}

	const setHeaderAdditionalMsg = (additionalMsg: string) => {
		state.additionalMsg = additionalMsg
	}

	const resetHeaderState = () => {
		state.message = "";
		state.additionalMsg = ""
	}

	return {
		...toRefs(state),
		setHeaderMessage,
		setHeaderAdditionalMsg,
		resetHeaderState
	}
}