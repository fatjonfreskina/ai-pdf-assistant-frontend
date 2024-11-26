<script setup>
import ChatBox from './ChatBox.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore'
import { ref, watch } from 'vue'

const router = useRouter()
const authStore = useAuthStore()
const props = defineProps(['assistants', 'user'])
const selectedAssistant = ref(null)
const isSubmenuOpen = ref(true)

const toggleSubmenu = () => {
  isSubmenuOpen.value = !isSubmenuOpen.value
}

const selectAssistant = (assistant) => {
  selectedAssistant.value = assistant
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

// Watch for changes in props.assistants
watch(
  () => props.assistants,
  (newAssistants) => {
    if (newAssistants && newAssistants.length > 0) {
      selectedAssistant.value = newAssistants[0]
    }
  }
)
</script>

<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div
          class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
        >
          <a
            href="/"
            class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span class="fs-5 d-none d-sm-inline">Menu</span>
          </a>
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li>
              <a
                href="#submenu1"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle"
                @click="toggleSubmenu"
              >
                <i class="fs-4 bi-speedometer2"></i>
                <span class="ms-1 d-none d-sm-inline">Assistants</span>
                <i :class="isSubmenuOpen ? 'bi-chevron-down' : 'bi-chevron-right'" class="ms-1"></i>
              </a>
              <ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                <li
                  v-for="(item, index) in props.assistants"
                  :key="index"
                  class="w-100 submenu-item"
                >
                  <a href="#" class="nav-link px-0" @click="selectAssistant(item)">
                    <span class="d-none d-sm-inline">{{ item }}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <hr />
          <div class="dropdown pb-4">
            <a
              href="#"
              class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="hugenerd"
                width="30"
                height="30"
                class="rounded-circle"
              />
              <span class="d-none d-sm-inline mx-1">{{ props.user.username }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li>
                <a class="dropdown-item" href="https://github.com/fatjonfreskina/ai-pdf-assistant-frontend/issues/new/choose">
                  Bug Report <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><a class="dropdown-item" href="#" @click="logout">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col py-3">
        <ChatBox v-if="selectedAssistant != null" :assistant="selectedAssistant" />
        <div v-else class="alert alert-info" role="alert">
          Select an assistant from the menu to start chatting.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.submenu-item {
  padding-left: 20px; /* Adjust the value as needed */
}

.nav-link {
  color: #ffffff;
}

.nav-link:hover {
  color: #cccccc;
}

.dropdown-menu-dark {
  background-color: #343a40;
}

.dropdown-item:hover {
  background-color: #495057;
}
</style>
