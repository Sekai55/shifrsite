<template>
  <div class="card" @click="redirectToNewPage">
    <div class="card-header">
      <h2>{{ title }}</h2>
    </div>
    <div class="card-content">
      <div class="card-description">
        <p>{{ description }}</p>
      </div>
      <div class="card-image-container">
        <img :src="imageSrc" alt="" class="card-image">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardBlock',
  props: {
    title: String,
    imageSrc: String,
    description: String,
    newPageRoute: String
  },
  methods: {
    redirectToNewPage() {
      this.$router.push(this.newPageRoute);
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 0px;
  height: 70px;
  font-size: 15px;
}

.card-content {
  display: flex;
  align-items: center;
}

.card-description {
  flex: 1;
}

.card-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card img {
  width: 100px;
}
</style>