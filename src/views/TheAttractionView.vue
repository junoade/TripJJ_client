<script setup>
import { ref, onMounted } from "vue";
import { listAttractions, listSido, listGugun } from "@/api/attraction"
import VKakaoMap  from "@/components/layout/VKakaoMap.vue";
import VSelect from "@/components/common/VSelect.vue";
import AttractionListItem from "@/components/Attraction/item/AttractionListItem.vue";

// 페이징 정보
import PageNavigation from "@/components/common/PageNavigation.vue";
const currentPage = ref(1);
const totalPage = ref(0);

// 검색 조건 및 결과 리스트
const sidoList = ref([{ text: "시/도", value: "" }]);
const gugunList = ref([{ text: "구/군", value: "" }]);
const contentTypeList = ref([
  { text: "유형", value: "" },
  { text: "관광지", value: "12" }, { text: "문화시설", value: "14" },
  { text: "축제공연행사", value: "15" }, { text: "여행코드", value: "25" },
  { text: "레포츠", value: "28" }, { text: "숙박", value: "32" },
  { text: "쇼핑", value: "38" }, { text: "음식점", value: "39" }
]);

// MAP => 
const attractions = ref([]);          // 검색 결과 리스트 => 관광지 정보
const selectedAttraction = ref({});   // 선택된 Attraction

// 검색 조건 객체
const conditions = ref({
  sidoCode: "",
  gugunCode: "",
  contentTypeId: "",
  title: "",
  pgno: currentPage.value,
  // spp: VITE_ARTICLE_LIST_SIZE
  spp: 9
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
  conditions.value.gugunCode = val;
};

const onChangeContentType = (val) => {
  conditions.value.contentTypeId = val;
}

const getAttractionList = () => {
  console.log("서버에서 관광지 목록 얻어오자!!!", conditions.value)

  // API 호출
  listAttractions(
    conditions.value,
    ({ data }) => {
      console.log("TheAttractionView : ", data.attractions);
      attractions.value = data.attractions;
      currentPage.value = data.currentPage;
      totalPage.value = data.totalPageCount;
    },
    (error) => {
      console.log(error);
    }
  );
}

const onSearch = () => {
  console.log("검색 개시", conditions.value)
  currentPage.value = 1;
  conditions.value.pgno = 1;
  getAttractionList();
}
const onPageChange = (val) => {
  console.log(val + "번 페이지로 이동 준비 끝!!!");
  currentPage.value = val;
  conditions.value.pgno = val;
  getAttractionList();
};


const viewAttraction = (attraction) => {
  selectedAttraction.value = attraction;
};

onMounted(() => {
  // 현재 페이지 번호 초기화
  getSidoList();

  // currentPage.value = 1;
  // conditions.value.pgno = 1;
  // getAttractionList();
});

</script>

<template>
  <div class="container text-center mt-3">
    <div class="table equal"></div>
    <div class="row">
      <!-- 중앙 left -->
      <div class="col-md-6">
        <!-- <div class="alert alert-success" role="alert">관광지 검색</div> -->
        <!-- 검색 바 -->
        <form class="d-flex my-3" onsubmit="return false;" role="search">
          <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
          <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
          <VSelect :selectOption="contentTypeList" @onKeySelect="onChangeContentType" />
          <input id="search-keyword" class="form-control me-2" type="search"
                  placeholder="검색어" aria-label="검색어" v-model="conditions.title" />
          <button id="btn-search" class="btn btn-outline-success" type="button" @click="onSearch">검색</button>
        </form>

        <!-- 지도 -->
        <VKakaoMap 
          :attractions="attractions" 
          :selectedAttraction="selectedAttraction">
        </VKakaoMap>
      </div>

      <!-- 중앙 right -->
      <div class="col-md-6">
        <!-- 관광지 검색 결과 아이템 => 가로에 3개-4개씩 뿌리면 될 듯...? -->
        <div class="row overflow-auto" style="max-width: 100%; max-height: 750px ">
          <AttractionListItem
            v-for="attraction in attractions"
            :key="attraction.title"
            :attraction="attraction"
            @click="viewAttraction(attraction)">
          </AttractionListItem>
        </div>

        <!-- 페이징 -->
        <PageNavigation 
          :current-page="currentPage"
          :total-page="totalPage"
          @pageChange="onPageChange">
        </PageNavigation>
      </div>
    </div>
  </div>
</template>

<style scoped>
mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
</style>