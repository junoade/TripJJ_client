<script setup>

</script>

<template>
    <div class="d-flex justify-content-center p-2">
        <h2>지금 검색해볼까요?</h2><br />
    </div>
    <div class="d-flex justify-content-center p-2">
        <div class="search-box">
            <button class="btn-search"><i class="bi bi-search"></i></button>
            <input type="text" class="input-search" placeholder="검색해주세요 :D">
        </div>
    </div>
</template>

<style scoped>

/* 버튼 관련 */
.search-box {
    width: fit-content;
    height: fit-content;
    position: relative;
}

.input-search {
    height: 50px;
    width: 50px;
    border-style: none;
    padding: 10px;
    font-size: 18px;
    letter-spacing: 2px;
    outline: none;
    border-radius: 25px;
    transition: all .5s ease-in-out;
    background-color: #000000;
    padding-right: 40px;
    color: #000000;
}

.input-search::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 100;
}

.btn-search {
    width: 50px;
    height: 50px;
    border-style: none;
    font-size: 20px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    right: 0px;
    color: black;
    background-color: transparent;
    pointer-events: painted;
}

.btn-search:hover~.input-search {
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(7, 0, 0, 0.5);
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}

.input-search:hover {
    width: 300px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
</style>