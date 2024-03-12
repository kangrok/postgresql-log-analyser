/* eslint-disable */
<template>
    <v-container v-if="analysis != null">

        <v-container class="pt-8">
            <h1>Logide analüüs</h1>
            <h2 v-if="isStudent && analysis.studentName != null" class="pb-2">{{ analysis.studentName }}</h2>
            <h2 v-else-if="!isStudent" class="pb-6">Rühma kokkuvõte</h2>

            <v-alert
                v-if="analysis.error"
                class="mb-6 rounded-0"
                color="red"
                variant="tonal"
            >
                {{ errorMessage }}
            </v-alert>

            <v-card class="pt-8 rounded-0" v-if="hasLogFiles">
                <v-row class="pb-6 px-16" v-if="isStudent">
                    <v-col>
                        Analüüsitud failid:
                    </v-col>
                    <v-col>
                        <p v-for="fileName in analysis.fileNames" :key="fileName" >
                            {{ fileName }}
                        </p>
                    </v-col>
                </v-row>
                <v-divider v-if="isStudent"></v-divider>
                <div v-if="analysis.validCount + analysis.errorCount > 0">

                    <v-row class="px-16 py-8">
                        <v-table>
                            <thead></thead>
                            <tbody>
                            <tr>
                                <td>Päringute koguarv:</td>
                                <td>{{ this.$props.analysis.errorCount + this.$props.analysis.validCount }}</td>
                            </tr>
                            <tr>
                                <td>Edukate päringute arv:</td>
                                <td class="valid-text-color">{{ this.$props.analysis.validCount }}
                                    ({{
                                        (100 * analysis.validCount / (analysis.errorCount + analysis.validCount)).toFixed(1)
                                    }}%)
                                </td>
                            </tr>
                            <tr>
                                <td>Vigaste päringute arv:</td>
                                <td class="error-text-color">{{ this.$props.analysis.errorCount }} ({{
                                        (100 * analysis.errorCount / (analysis.errorCount + analysis.validCount)).toFixed(1)
                                    }}%)
                                </td>
                            </tr>
                            <tr v-if="this.$props.analysis.studentName === null">
                                <td>Keskmine vigade arv tudengi kohta:</td>
                                <td>{{ this.$props.analysis.errorCount / 4 }}</td>
                            </tr>
                            <tr v-else>
                                <td>Ühekordsete vigade arv:</td>
                                <td>{{ this.$props.analysis.uniqueErrorCount }}</td>
                            </tr>
                            </tbody>
                        </v-table>
                        <v-progress-circular
                            class="ml-16 mt-12"
                            :size="160"
                            :width="30"
                            :model-value="100 * analysis.errorCount / (analysis.errorCount + analysis.validCount)"
                            color="red-lighten-1"
                            bg-color="light-green-lighten-1"
                            v-if="analysis.errorCount > 0 || analysis.validCount > 0"
                        />
                    </v-row>

                    <v-container class="pa-8">
                        <h3 class="pb-6">Veatüüpide jaotus</h3>

                        <Bar :data="chartData" :options="chartOptions" />
                    </v-container>

                    <RepeatedErrorsPanel v-if="analysis.repeatedErrors.length !== 0" :errors="analysis.repeatedErrors"/>
                </div>
                <p v-else-if="!analysis.error" class="pa-8">Valitud ajavahemikus ei tehtud ühtegi päringut.</p>
            </v-card>
        </v-container>
    </v-container>
    <div class="text-center" v-else>
        <v-progress-circular
            indeterminate
            color="primary"
        ></v-progress-circular>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import RepeatedErrorsPanel from "@/components/RepeatedErrorsPanel";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: "AnalysisSummary",
    components: { RepeatedErrorsPanel, Bar },
    props: {
        analysis: {
            studentName: String,
            error: String,
            fileNames: Array,
            errorCount: Number,
            uniqueErrorCount: Number,
            validCount: Number,
            syntaxErrorCount: Number,
            nonExistentValueCount: Number,
            constraintViolationCount: Number,
            alreadyExistsErrorCount: Number,
            aggregateErrorCount: Number,
            typoCount: Number,
            otherErrorCount: Number,
            repeatedErrors: Object,
        }
    },

    data() {
        return {
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
                         'Trükivead', ['Agregeeritud', 'funktsiooni', 'vead'], ['Topelt', 'defineerimine'], 'Muud vead'],
                datasets: [
                    {
                        title: 'Veatüüpide jaotus',
                        backgroundColor: ["#5EBD9B", "#F8DA62", '#104D83', "#F79F3D", "#72CAD8", '#E34F5B', '#A048A4'],
                        data: [this.analysis.syntaxErrorCount,
                            this.analysis.nonExistentValueCount,
                            this.analysis.constraintViolationCount,
                            this.analysis.typoCount,
                            this.analysis.aggregateErrorCount,
                            this.analysis.alreadyExistsErrorCount,
                            this.analysis.otherErrorCount]
                    }
                ],
            }
        },

        errorMessage() {
            return this.analysis.fileNames && this.analysis.fileNames.length !== 0
                ? "Logifaili lugemine ebaõnnestus, faili sisuks ei ole PostgreSQL serveri logid."
                : "Logifaile ei leitud"
        },

        isStudent() {
            return Object.prototype.hasOwnProperty.call(this.analysis, 'studentName');
        },

        hasLogFiles() {
            return !this.isStudent || this.analysis.fileNames.length !== 0;
        }
    }
}
</script>

<style scoped>

.error-text-color {
    color: red;
}

.valid-text-color {
    color: green;
}

</style>