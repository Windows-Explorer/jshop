<template>
  <Popover as="div">
    <PopoverButton class="ui-button">
      <VUIButton>
        <template v-slot:icon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M4 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H4zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
          </svg>
        </template>
      </VUIButton>
    </PopoverButton>

    <transition name="popover">
      <PopoverPanel class="popover">
        <span class="vertical-line"></span>
        <div class="popover-content">
          <VUIButton label="Войти">
            <template v-slot:icon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-7.208a2.5 2.5 0 1 1 2 0V16h-2v-3.208z" />
              </svg>
            </template>
          </VUIButton>
          <VUIButton label="Регистрация">
            <template v-slot:icon>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0H24V24H0z" />
                <path
                  d="M2 21v-2h2V4.835c0-.484.346-.898.821-.984l9.472-1.722c.326-.06.638.157.697.483.007.035.01.07.01.107v1.28L19 4c.552 0 1 .448 1 1v14h2v2h-4V6h-3v15H2zM13 4.396L6 5.67V19h7V4.396zM12 11v2h-2v-2h2z" />
              </svg>
            </template>
          </VUIButton>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
  
<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
</script>

<style lang="scss" scoped>
.popover-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  overflow: hidden;
  transition: 0.8s cubic-bezier(0.6, 0.1, 0, 1.5);

  svg {
    fill: $primary;
  }
}

.popover {
  color: $primary;
  position: absolute;
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 200px;
  height: 100px;
  overflow: hidden;
}

.vertical-line {
  width: 2.5px;
  background-color: $primary;
  border-radius: 20px;
  height: 100px;
}

.popover-enter-active,
.popover-leave-active {
  transition: 0.3s ease;
  overflow: hidden;

  .vertical-line {
    transition: 0.3s ease;
  }

  .popover-content {
    overflow: hidden;
    transition: 0.5s cubic-bezier(0.6, 0.1, 0, 1.5);

    svg {
      transition: 0.3s ease;
    }
  }
}

.popover-enter-to,
.popover-leave-from {
  .vertical-line {
    height: 100px;
  }

  .popover-content {
    transform: translateX(0%);

    svg {
      transform: scale(1);
    }
  }
}

.popover-enter-from,
.popover-leave-to {
  .vertical-line {
    height: 0px;
  }

  .popover-content {
    transform: translateX(-100%);

    svg {
      transform: scale(0);
    }
  }
}</style>
  