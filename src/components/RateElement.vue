<template>
  <div class="item-list">
    <div class="item-list__container">
      <div class="item-list__img">
        <img :src="item.thumbnail" alt="image product" />
      </div>
      <div class="item-list__content list-content">
        <h4 class="list-content__title">{{ item.title }}</h4>
        <p class="list-content__description">{{ item.description }}</p>
        <div class="list-content__discount">
          <span> {{ 'Discount ' + item.discountPercentage + '%' }}</span>
          <span class="brand">{{ item.brand }}</span>
        </div>
        <div class="list-content__price">
          <span>{{ '$' + item.price }}</span>
          <div>
            <img src="@/assets/rating.svg" alt="rating" />
            <span>{{ item.rating }}</span>
          </div>
          <span class="category">{{ item.category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type IProducts from '@/module/models'

defineProps<{
  item: IProducts
}>()
</script>

<style scoped>
.item-list {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding: 4px 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.item-list:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.item-list__container {
  display: flex;
  gap: 5px;
  width: 100%;
  max-width: 1000px;
  cursor: pointer;
}
.item-list__img {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-list__img img {
  width: 120px;
  height: 120px;
  border-radius: 8px;
}

.item-list__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.list-content__title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.list-content__description {
  font-size: 15px;
  color: #666;
  margin-bottom: 8px;
}
.list-content__discount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #ff5a5a;
  margin-bottom: 8px;
}
.list-content__discount .brand {
  font-size: 20px;
  color: rgb(8, 168, 115);
}

.list-content__price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  color: #333;
}
.list-content__price .category {
  background: #3c2f80;
  color: #fff;
  padding: 1px 5px;
  border-radius: 15px;
}
.list-content__price img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.list-content__price span {
  font-size: 17px;
  color: #777;
}

.list-content__price div {
  display: flex;
  align-items: center;
}

.item-list__container:last-child {
  margin-left: auto;
}
</style>
