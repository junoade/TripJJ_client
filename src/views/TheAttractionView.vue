<script setup>
import { ref, onMounted } from "vue";
import { listAttractions, listSido, listGugun } from "@/api/attraction"
import VKakaoMap  from "@/components/layout/VKakaoMap.vue";
import VSelect from "@/components/common/VSelect.vue";
import axios from "axios";

const { VITE_OPEN_API_SERVICE_KEY } = import.meta.env;
const sidoList = ref([{ text: "시/도", value: "" }]);
const gugunList = ref([{ text: "구/군", value: "" }]);
const contentList = ref([
  { text: "유형", value: "" },
  { text: "관광지", value: "12" }, { text: "문화시설", value: "14" },
  { text: "축제공연행사", value: "15" }, { text: "여행코드", value: "25" },
  { text: "레포츠", value: "28" }, { text: "숙박", value: "32" },
  { text: "쇼핑", value: "38" }, { text: "음식점", value: "39" }
]);
const attractions = ref([]);          // 검색 결과 리스트 => 관광지 정보
const selectedAttraction = ref({});   // 선택된 Attraction

// const param = ref({
//   serviceKey: VITE_OPEN_API_SERVICE_KEY,
//   pageNo: 1,
//   numOfRows: 20,
//   zscode: 0,
// });

// 검색 조건
const conditions = ref({
  sidoCode: "",
  gugunCode: "",
  contentTypeId: "",
  title: ""
});

onMounted(() => {
  // getChargingStations();
  getSidoList();
});

const getSidoList = () => {
  listSido(
    ({ data }) => {
      let options = [];
      options.push({ text: "시/도", value: "" });
      data.forEach((sido) => {
        options.push({ text: sido.sidoName, value: sido.sidoCode });
      });
      sidoList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
};

const onChangeSido = (val) => {
  listGugun(
    { sidoCode: val },
    ({ data }) => {
      let options = [];
      options.push({ text: "구/군", value: "" });
      console.log(data)
      data.forEach((gugun) => {
        options.push({ text: gugun.gugunName, value: gugun.gugunCode });
      });
      gugunList.value = options;
    },
    (err) => {
      console.log(err);
    }
  );
  conditions.value.sidoCode = val;
  // conditions.value.gugunCode = '';
};

const onChangeGugun = (val) => {
  // param.value.zscode = val;
  conditions.value.gugunCode = val;
};

const onChangeContentType = (val) => {
  conditions.value.contentTypeId = val;
}

const getAttractionList = () => {

  console.log("검색 개시", conditions.value)
  listAttractions(conditions.value, ({ data }) => {
      console.log(data)
      attractions.value = data;
    }, (error) => {
      console.log(error);
    }
  );
}

const viewAttraction = (attraction) => {
  selectedAttraction.value = attraction;
};

</script>

<template>
  <div class="container text-center mt-3">
    <div class="alert alert-success" role="alert">관광지 검색</div>

    <form class="d-flex my-3" onsubmit="return false;" role="search">
      <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
      <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
      <VSelect :selectOption="contentList" @onKeySelect="onChangeContentType" />
      <input id="search-keyword" class="form-control me-2" type="search"
              placeholder="검색어" aria-label="검색어" v-model="conditions.title" />
      <button id="btn-search" class="btn btn-outline-success" type="button" @click="getAttractionList">검색</button>
    </form>

    <!-- <VKakaoMap :stations="chargingStations" :selectStation="selectStation" /> -->
    <table class="table table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">대표이미지</th>
          <th scope="col">관광지명</th>
          <th scope="col">주소</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center"
          v-for="attraction in attractions"
          :key="attraction.firstimage"
          @click="viewAttraction(attraction)"
        >
          <th><img :src="attraction.firstImage" alt="이미지 없음!" class="img-fluid"></th>
          <td>{{ attraction.title }}</td>
          <td>{{ attraction.addr1 }} {{ attraction.addr2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
</style>