<template>
  <Menu as="div">
    <div>
      <MenuButton class="ui-button">
        <VUIButton />
      </MenuButton>
    </div>

    <transition>
      <MenuItems>
        <MenuItem>
          item
        </MenuItem>
        <MenuItem>
          item
        </MenuItem>
        <MenuItem>
          item
        </MenuItem>
        <MenuItem>
          item
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
  
<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>
  