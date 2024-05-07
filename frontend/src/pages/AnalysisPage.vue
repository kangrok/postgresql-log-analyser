/* eslint-disable */
<template>
    <div class="result-container">
        <v-navigation-drawer v-if="isGroup" width="300">
            <template v-slot:prepend>
                <div class="pa-8">
                    <v-btn
                        block
                        @click="this.$emit('upload')"
                        color="#3F51B5"
                    >
                        Laadi üles uus fail
                    </v-btn>
                </div>
            </template>
            <v-list>
                <v-list-item
                    link
                    title="Rühma kokkuvõte"
                    v-on:click="this.displayData = analysisResult.summary; activeListItem = -1"
                    :active="activeListItem === -1"
                    color="#3F51B5"
                    class="my-3"
                />

                <v-divider />

                <v-list-item>
                    <div class="text-overline">Individuaalsed analüüsid</div>
                </v-list-item>

                <v-list-item
                    v-for="(analysis, index) in analysisResult.analysis"
                    link
                    :title="analysis.studentName"
                    v-on:click="this.displayData = analysis; activeListItem = index"
                    v-bind:key="index"
                    :active="activeListItem === index"
                    class="py-3"
                    color="#3F51B5"
                />

            </v-list>
        </v-navigation-drawer>

        <v-container v-if="displayData">
            <v-container class="pt-8">

                <v-row class="pa-2" justify="space-between">
                    <div class="text-h4">Logide analüüs</div>
                    <v-btn
                        v-if="!isGroup"
                        @click="this.$emit('upload')"
                        color="#3F51B5"
                    >
                        Laadi üles uus fail
                    </v-btn>
                </v-row>

                <AnalysisIndividual v-if="displayData.queryEventGroups" :analysis="displayData"/>
                <AnalysisSummary v-else :analysis="displayData"/>

                <div v-if="displayData.errorCount !== 0">
                    <div class="text-h6 mt-6 mb-3">Vigade analüüs</div>

                    <v-card rounded="0">
                        <v-container class="pa-8">
                            <h3 class="pb-6">Veatüüpide jaotus</h3>

                            <Bar :data="chartData" :options="chartOptions"/>
                        </v-container>

                        <v-container v-if="displayData.repeatedErrors.length !== 0" class="pa-8">
                            <h3 class="pb-6">Korduvad vead</h3>
                            <RepeatedErrorsPanel :errors="displayData.repeatedErrors"/>
                        </v-container>
                    </v-card>
                </div>

                <div v-if="displayData.logs && displayData.totalCount > 0">
                    <div class="text-h6 mt-6 mb-3">Kõik päringud</div>
                    <LogViewer :log="displayData.logs"/>
                </div>

            </v-container>
        </v-container>

        <div class="text-center" v-else>
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </div>

    </div>

</template>

<script>
import AnalysisSummary from "@/components/AnalysisSummary.vue";
import AnalysisIndividual from "@/components/AnalysisIndividual.vue";
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import RepeatedErrorsPanel from "@/components/RepeatedErrorsPanel.vue";
import LogViewer from "@/components/LogViewer.vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: "AnalysisPage",
    components: {AnalysisIndividual, AnalysisSummary, Bar, RepeatedErrorsPanel, LogViewer},

    props: {
        analysisResult: Object,
    },

    data() {
        return {
            isGroup: Object.prototype.hasOwnProperty.call(this.analysisResult, 'summary'),
            displayData: this.analysisResult.summary ?? this.analysisResult,
            activeListItem: -1,
            chartOptions: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        min: 0,
                        ticks: {
                            stepSize: 1,
                        }
                    }
                }
            }
        }
    },
    computed: {
        chartData() {
            return {
                labels: ['Süntaksivead', ['Defineerimata', 'väärtuse', 'kasutamine'], ['Kitsenduse', 'rikkumine'],
                    'Trükivead', ['Agregeeritud', 'funktsiooni', 'vead'], ['Topelt', 'defineerimine'],
                    ['Andmetüübi', 'mittevastavus'], ['Ise loodud', 'veateated'], 'Muud vead'],
                datasets: [
                    {
                        title: 'Veatüüpide jaotus',
                        backgroundColor: ["#5EBD9B", "#F8DA62", '#104D83', "#F79F3D", "#72CAD8", '#E34F5B', '#A048A4', '#9561e2', '#f66d9b'],
                        data: [this.displayData.syntaxErrorCount,
                            this.displayData.nonExistentValueCount,
                            this.displayData.constraintViolationCount,
                            this.displayData.typoCount,
                            this.displayData.aggregateErrorCount,
                            this.displayData.alreadyExistsErrorCount,
                            this.displayData.datatypeMismatchCount,
                            this.displayData.customErrorCount,
                            this.displayData.otherErrorCount]
                    }
                ],
            }
        },
    }
};
</script>

<style scoped>

.result-container {
    position: relative;
    align-items: center;
}

</style>