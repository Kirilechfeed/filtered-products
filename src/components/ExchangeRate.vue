<template>
  <div class="wrapper">
    <input
      @input="onSearchInput"
      v-model="searchQuery"
      placeholder="Поиск по товарам..."
      class="search-input"
    />
    <div @scroll="onScroll" ref="container" class="container-rate">
      <TransitionGroup name="list">
        <RateElement v-for="item in visibleItems" :key="item.id" :item="item" />
      </TransitionGroup>
    </div>
    <div v-if="isLoading" class="loader">загрузка данных....</div>
    <div v-if="!isLoading && visibleItems.length == 0" class="filtered">Ничего не найдено</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, nextTick, type ComputedRef } from 'vue'
import RateElement from '@/components/RateElement.vue'
import type IData from '@/module/models'
import type IProducts from '@/module/models'

const visibleItems = ref<IProducts[]>([])
const allProducts = ref<IProducts[]>([])
const container = ref<HTMLDivElement | null>(null)
const isLoading = ref(true)
const searchQuery = ref('')
const VISIBLE_COUNT = 20
const BUFFER_COUNT = 10
const filtered = ref<IProducts[]>([])
const fetchProduct = async () => {
  isLoading.value = true
  try {
    const response = await fetch('https://dummyjson.com/products?limit=100')
    const data: IData = await response.json()
    allProducts.value = data.products
    visibleItems.value = allProducts.value.slice(0, VISIBLE_COUNT)
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  } finally {
    isLoading.value = false
  }
}
const onSearchInput = () => {
  visibleItems.value = []
  updateVisibleItems()
}

const filteredProducts: ComputedRef<IProducts[]> = computed(() => {
  if (!searchQuery.value) return allProducts.value || []
  return allProducts.value.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const updateVisibleItems = () => {
  const visibleCount = visibleItems.value.length
  filtered.value = filteredProducts.value.slice(
    visibleCount,
    visibleCount + VISIBLE_COUNT + BUFFER_COUNT,
  )

  visibleItems.value.push(...filtered.value)
}

const onScroll = () => {
  if (container.value) {
    const { scrollTop, scrollHeight, clientHeight } = container.value
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      updateVisibleItems()
    }
  }
}

onMounted(async () => {
  await fetchProduct()
  await nextTick()
})
</script>

<style scoped>
.container-rate {
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 0 auto;
  width: 1000px;
  height: 700px;
  background: #cecece;
  padding: 5px;
  border-radius: 15px;
}
.wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.search-input {
  width: 100%;
  padding: 10px;
  font-size: 20px;
}
.loader {
  position: absolute;
  top: 0;
  height: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.filtered {
  position: absolute;
  top: 0;
  height: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
