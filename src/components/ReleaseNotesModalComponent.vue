<template>
  <div
    class="modal fade"
    id="releaseNotesModal"
    tabindex="-1"
    aria-labelledby="releaseNotesModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="releaseNotesModalLabel">Release Notes</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Version 0.2.2 - 27/11/2024</p>
          <ul>
            <li>Add the possibility to reset the password if forgotten</li>
            <li>The replies now include citations to the sources of the information</li>
            <li>In the sidebar, the user can now report bugs and view the release notes</li>
            <li>Modified the .icon file to include a new icon for the application</li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const modalInstance = ref(null)

// Function to show the modal
const show = () => {
  if (modalInstance.value) {
    modalInstance.value.show()
  }
}

// Initialize the modal when the component is mounted
onMounted(() => {
  const modalElement = document.getElementById('releaseNotesModal')
  if (modalElement) {
    modalInstance.value = new Modal(modalElement)
  }
})

// Expose the show function to the parent component
defineExpose({
  show
})
</script>
