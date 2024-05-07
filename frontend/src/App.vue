/* eslint-disable */
<template>
    <v-app style="background-color: #F7F8FC">

        <v-app-bar app density="comfortable" elevation="0" color="#3F51B5">
            <v-toolbar-title>PostgreSQL logide analüsaator</v-toolbar-title>
        </v-app-bar>

        <v-container class="content pt-16">
            <AnalysisPage v-if="showAnalysis" @upload="this.showAnalysis = false" :analysis-result="this.analysis"/>
            <UploadPage v-else @analysis="openAnalysis"/>

        </v-container>

    </v-app>
</template>

<script>
import UploadPage from "@/pages/UploadPage.vue"
import AnalysisPage from "@/pages/AnalysisPage.vue";
import {defineComponent} from "vue";

export default defineComponent({
    components: {AnalysisPage, UploadPage},

    data() {
        return {
            showAnalysis: false,
            analysis: undefined,
        }
    },

    methods: {
        openAnalysis(analysisData) {
            this.analysis = analysisData;
            console.log(this.analysis);
            this.showAnalysis = true;
        },
    }

});
</script>
<style>

.content {
    width: 1020px !important;
    margin: 54px auto;
    align-items: center;
}

</style>