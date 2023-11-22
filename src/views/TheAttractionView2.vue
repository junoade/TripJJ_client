<script setup>
import { ref, onBeforeUnmount, onMounted } from "vue";
import { listAttractions, listSido, listGugun, listInterestsContentIds, updateInterests } from "@/api/attraction";
import VKakaoMap2  from "@/components/layout/VKakaoMap2.vue";
import VSelect from "@/components/common/VSelect.vue";
import AttractionListItem from "@/components/Attraction/item/AttractionListItem.vue";
import { useMemberStore } from "@/stores/member";

// insert, delete 할 정보 관리
const originalInterests = ref([]);      // 기존 관심 관광지 리스트(전부 다 받아올 것)
const newInterests = ref([]);           // 새로운 관심 관광지 리스트

const newInterestsInfo = ref({
    userId: useMemberStore().userInfo.userId,
    addInterests: [],
    delInterests: [],
});

// DB내 저장된 관심 관광지 정보를 받아와 로컬에 저장한다(원본, 수정 가능본).
const getInterests = () => {
    newInterestsInfo.value.addInterests = [];
    newInterestsInfo.value.delInterests = [];
    listInterestsContentIds(
        newInterestsInfo.value.userId,
        ({ data }) => {
            originalInterests.value = data;
            newInterests.value = data.slice();
            console.log("저장된 모든 관심 관광지 정보 출력 : ", originalInterests.value);
        },
        (error) => {
            console.log(error);
        }
    )
}

// 로컬에 위치한 새로운 관광지 정보를 수정한다.
const updateNewInterests = (attraction) => {
    // 선택한 관광지의 존재 여부 확인 및 업데이트
    let idx = newInterests.value.findIndex((contentId) => contentId === attraction.contentId);

    if (idx===-1) {
        newInterests.value.push(attraction.contentId);
        console.log("관심 관광지 저장! ", newInterests.value);
    } else {
        newInterests.value.splice(idx, 1);
        console.log("관심 관광지 삭제! ", newInterests.value);
    }
}

// 로컬에 위치한 관심 관광지 원본과 수정 가능본을 비교하여 추가/삭제할 contentId 선정
const updateInterestDB = async () => {
    console.log("원본 : ", originalInterests.value);
    console.log("신규 : ", newInterests.value);

    // 신규 괌심 리스트를 순회하면서, 원본에 없는 것은 추가 관심 리스트에 추가
    newInterests.value.forEach((contentId) => {
        if (!originalInterests.value.includes(contentId))
            newInterestsInfo.value.addInterests.push(contentId);
    })

    // 원본 관심 리스트를 순회하면서, 신규에 없는 것은 삭제 관심 리스트에 추가
    originalInterests.value.forEach((contentId) => {
        if (!newInterests.value.includes(contentId))
            newInterestsInfo.value.delInterests.push(contentId);
    })

    console.log("관심 관광지 업데이트 시도 : ", newInterestsInfo.value);
    await updateInterests(
        newInterestsInfo.value,
        ({data}) => {
            alert("등록이 완료되었습니다!")
        }, 
        (error) => {
            console.log(error);
        }
    )
    getInterests();
}

// 페이징 정보
import PageNavigation from "@/components/common/PageNavigation.vue";
const currentPage = ref(1);
const totalPage = ref(0);
const navigationSize = ref(3);

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
const attractions = ref([]);            // 검색 결과 리스트 => 관광지 정보
const selectedAttraction = ref({});     // 선택된 Attraction

// 검색 조건 객체
const conditions = ref({
    sidoCode: "",
    gugunCode: "",
    contentTypeId: "",
    title: "",
    pgno: currentPage.value,
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


getSidoList();
getInterests();  

</script>

<template>
    <!-- 검색 바 -->
    <div class="container mt-3">
        <form class="d-flex justify-content-center" onsubmit="return false;" role="search">
            <VSelect :selectOption="sidoList" @onKeySelect="onChangeSido" />
            <VSelect :selectOption="gugunList" @onKeySelect="onChangeGugun" />
            <VSelect :selectOption="contentTypeList" @onKeySelect="onChangeContentType" />
            <input id="search-keyword" class="form control form-control-sm me-2" type="search" 
                  placeholder="검색어" aria-label="검색어" v-model="conditions.title" />

            <!-- 이게 계속 자동 줄바꿈이 됩니다. 해결 필요 -->
            <button id="btn-search" class="btn btn-outline-success btn-sm" type="button" @click="onSearch">검색</button>
        </form>
    </div>

    <!-- 결과 리스트 / 지도 -->
    <div class="m-3 row">
        <!-- 지도 -->
        <VKakaoMap2
            :attractions="attractions"
            :selectedAttraction="selectedAttraction">
        </VKakaoMap2>
      
        <!-- 결과 리스트 -->
        <div class="position-absolute m-3 justify-content-center bg-white bg-opacity-75" 
            style="z-index: 2; max-width: 300px; max-height: 100%;" >
            <button class="btn btn-outline-info btn-sm mt-3" type="button" @click="updateInterestDB">관심 리스트 저장!</button>

            <div id="attractionList" class="overflow-auto mt-3"
                style="max-width: 300px; max-height: 800px;" >
                <AttractionListItem
                    v-for="attraction in attractions"
                    :key="attraction.title"
                    :attraction="attraction" :interests="newInterests"
                    @view-attraction="viewAttraction"
                    @update-new-interests="updateNewInterests">
                </AttractionListItem>
            </div>
        
            <!-- 페이징 -->
            <PageNavigation 
                class="mt-3"
                :current-page="currentPage" :navigationSize="navigationSize"
                :total-page="totalPage"
                @pageChange="onPageChange">
            </PageNavigation>
        </div>
    </div>
</template>

<style scoped>
#attractionList::-webkit-scrollbar{
  display: none;
}
mark.purple {
  background: linear-gradient(to top, #c354ff 20%, transparent 30%);
}
</style>