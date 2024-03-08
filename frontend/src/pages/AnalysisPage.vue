/* eslint-disable */
<template>
    <div class="result-container">
        <v-navigation-drawer v-if="analysisResult !== null">
            <v-btn class="ma-6" @click="this.$emit('upload')" color="#3F51B5">Laadi üles uus kaust</v-btn>
            <v-list-item
                link
                title="Rühma kokkuvõte"
                v-on:click="this.displayData = analysisResult.summary"
                class="py-3"
            />
            <v-divider></v-divider>
            <v-list-item
                v-for="(analysis, index) in analysisResult.analysis"
                link
                :title="analysis.studentName"
                v-on:click="this.displayData = analysis"
                v-bind:key="index"
                class="py-3"
            />
        </v-navigation-drawer>
        <AnalysisSummary :analysis="this.displayData ?? analysisResult.summary"/>
    </div>

</template>

<script lang="ts">
// import { defineComponent } from "vue";
import AnalysisSummary from "@/components/AnalysisSummary.vue";

export default {
    components: {AnalysisSummary},

    props: {
        analysisResult: {
            summary: {
                errorCount: Number,
                uniqueErrorCount: Number,
                validCount: Number,
                syntaxErrorCount: Number,
                nonExistentValueCount: Number,
                constraintViolationCount: Number,
                alreadyExistsErrorCount: Number,
                typoCount: Number,
                aggregateErrorCount: Number,
                otherErrors: Number,
                repeatedErrors: Object,
            },
            analysis: [
                {
                    studentName: String,
                    fileNames: Array,
                    errorCount: Number,
                    uniqueErrorCount: Number,
                    validCount: Number,
                    syntaxErrorCount: Number,
                    nonExistentValueCount: Number,
                    constraintViolationCount: Number,
                    alreadyExistsErrorCount: Number,
                    typoCount: Number,
                    aggregateErrorCount: Number,
                    otherErrors: Number,
                    repeatedErrors: Object,
                }
            ]
        },
    },

    data() {
        return {
            displayData: undefined
        }
    },
};
</script>

<style scoped>

.result-container {
    position: relative;
    align-items: center;
}


</style>