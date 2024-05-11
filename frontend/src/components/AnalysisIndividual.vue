<template>

    <div class="text-h6 py-3">{{ analysis.studentName }}</div>

    <div class="pb-6" v-if="analysis.fileNames.length !== 0">
        <span>
            Analüüsitud failid:
            <v-chip v-for="fileName in analysis.fileNames" :key="fileName" size="small">{{ fileName }}</v-chip>
        </span>
    </div>

    <v-alert
        v-if="analysis.error"
        class="mb-6"
        color="red"
        variant="tonal"
    >
        {{ errorMessage }}
    </v-alert>

    <v-card class="py-8" v-if="analysis.fileNames.length !== 0 && !analysis.error">
        <div v-if="analysis.totalCount !== 0">
            <QueryEventsBar
                :query-event-groups="analysis.queryEventGroups"
                :total-query-count="analysis.totalCount"
                :end-time="analysis.endTime"
            />
            <v-row class="pa-8 justify-center">
                <v-table class="w-66">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td>Päringute koguarv:</td>
                        <td>{{ analysis.totalCount }}</td>
                    </tr>
                    <tr>
                        <td>Edukate päringute arv:</td>
                        <td>
                            <v-chip color="green">
                                {{ analysis.validCount }}
                                ({{ (100 * analysis.validCount / (analysis.totalCount)).toFixed(1) }}%)
                            </v-chip>
                        </td>
                    </tr>
                    <tr>
                        <td>Vigaste päringute arv:</td>
                        <td>
                            <v-chip color="red">
                                {{ this.$props.analysis.errorCount }}
                                ({{ (100 * analysis.errorCount / (analysis.totalCount)).toFixed(1) }}%)
                            </v-chip>
                        </td>
                    </tr>
                    <tr>
                        <td>Ühekordsete vigade arv:</td>
                        <td>{{ this.$props.analysis.uniqueErrorCount }}</td>
                    </tr>
                    </tbody>
                </v-table>
            </v-row>
        </div>
        <p v-else-if="!analysis.error" class="pt-8 px-16">Valitud ajavahemikus ei tehtud ühtegi päringut.</p>
    </v-card>

</template>

<script>
import QueryEventsBar from "@/components/QueryEventsBar";

export default {
    name: "AnalysisIndividual",
    components: {QueryEventsBar},
    props: {
        analysis: {
            studentName: String,
            error: String,
            fileNames: Array,
            totalCount: Number,
            errorCount: Number,
            uniqueErrorCount: Number,
            validCount: Number,
            queryEventGroups: Array,
        }
    },

    computed: {
        errorMessage() {
            return this.analysis.fileNames.length !== 0
                ? "Logifaili lugemine ebaõnnestus, faili sisuks ei ole PostgreSQL serveri logid."
                : "Logifaile ei leitud"
        },
    }
}
</script>

<style scoped>

</style>