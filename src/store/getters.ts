import { useUserStore } from "@/store/modules/user"
import { computed } from "vue"

export const userGetters = () => ({
    token: computed(() => useUserStore.token())
})