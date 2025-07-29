<script setup>
import Icon from "@/components/Icon/Icon.vue";
import Grid from "@/components/Grid/Grid.vue";
import { createMessage } from "@/components/Message/methods";
const icons = [
  "house",
  "circle-user",
  "image",
  "file",
  "camera",
  "calendar",
  "cloud",
  "bell",
  "truck",
  "thumbs-up",
  "face-smile",
  "headphones",
  "user",
  "comment",
  "envelope",
  "globe",
  "trophy",
  "inbox",
  "print",
  "suitcase",
  "magnifying-glass",
  "check",
  "download",
  "font-awesome",
  "phone",
  "bars",
  "star",
  "location-dot",
  "music",
  "wand-magic-sparkles",
  "heart",
  "arrow-right",
  "circle-xmark",
  "bomb",
  "poo",
  "camera-retro",
  "xmark",
  "caret-up",
  "truck-fast",
  "pen-nib",
  "arrow-up",
  "hippo",
  "calendar-days",
  "paperclip",
  "shield-halved",
  "cart-shopping",
  "clipboard",
  "filter",
  "circle-info",
  "arrow-up-from-bracket",
  "bolt",
  "car",
  "ghost",
  "mug-hot",
  "pen",
  "umbrella",
  "gift",
  "film",
  "list",
  "gear",
  "trash",
  "circle-up",
  "circle-down",
  "rotate-right",
  "lock",
  "barcode",
  "tag",
  "book",
  "bookmark",
  "font",
  "video",
  "circle-half-stroke",
  "droplet",
  "pen-to-square",
  "share-from-square",
  "plus",
  "minus",
  "share",
  "circle-exclamation",
  "fire",
  "eye-slash",
  "plane",
  "magnet",
  "hand",
  "folder",
  "folder-open",
  "money-bill",
  "thumbs-down",
  "comments",
  "lemon",
  "key",
  "thumbtack",
  "gears",
  "paper-plane",
  "code",
  "city",
];
const copyFile = (name) => {
  navigator.clipboard.writeText(`<Icon icon="fa-solid fa-${name}" />`);
  createMessage({ message: "复制成功", type: "success" });
};
</script>
<template>
  <h3>Solid</h3>
  <Grid v-model="icons" :col="7">
    <template #default="{ item }">
      <div class="icon-item" @click="copyFile(item)">
        <Icon :icon="`fa-solid fa-${item}`" />
        <span class="icon-text">{{ item }}</span>
      </div>
    </template>
  </Grid>
</template>
<style scoped>
:deep(.lu-grid__col) {
  min-width: 100px !important;
  min-height: 100px !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 5px;
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
  color: #666;
  font-weight: 600;
  &:hover {
    border: 1px solid var(--lu-color-primary);
    .icon-text {
      color: var(--lu-color-primary);
    }
    svg {
      color: var(--lu-color-primary);
    }
  }
  .icon-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-align: center;
  }
  .lu-icon {
    svg {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
