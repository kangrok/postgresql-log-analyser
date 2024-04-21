/* eslint-disable */
<template>
    <div class="container">

        <v-card class="upload-container pa-6">
            <v-card-title>Laadi üles logifailide kaust</v-card-title>

            <v-spacer></v-spacer>

            <v-card-text>
                <v-alert
                    v-if="uploadFailed"
                    class="mb-6 rounded-0"
                    color="red"
                    variant="tonal"
                >
                    {{ this.errorMessage }}
                </v-alert>

                <v-file-input
                    clearable
                    label="Vali fail..."
                    variant="solo-filled"
                    prepend-icon="mdi-folder-upload"
                    @change="upload"
                ></v-file-input>

            </v-card-text>


            <v-card-text>
                <div class="text-overline pb-2">
                    Analüüsi ajavahemik
                </div>
                <v-radio-group v-model="periodSelection">
                    <v-radio label="Kõik logid" value="all"></v-radio>
                    <v-radio label="Viimane nädal" value="week"></v-radio>
                    <v-radio label="Muu ajavahemik" value="custom"></v-radio>
                    <v-col class="pl-12" style="max-width: 360px">
                        <v-text-field type="datetime-local" prefix="Algus:" :disabled="periodSelection !== 'custom'" v-model="selectedStartDate"/>
                        <v-text-field type="datetime-local" prefix="Lõpp:" :disabled="periodSelection !== 'custom'" v-model="selectedEndDate" />
                    </v-col>
                </v-radio-group>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="#3F51B5"
                    type="submit"
                    variant="elevated"
                    @click="analyse"
                >
                    Analüüsi
                </v-btn>
            </v-card-actions>

        </v-card>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            uploadedFile: undefined,
            periodSelection: 'all', // all, week, custom
            errorMessage: '',
            startDate: undefined,
            endDate: undefined,
            selectedStartDate: new Date().toISOString().substring(0, 16),
            selectedEndDate: new Date().toISOString().substring(0, 16),
            uploadFailed: false,
        }
    },

    methods: {

        upload(e) {
            this.uploadedFile = e.target.files[0];
        },

        analyse() {
            if (!this.uploadedFile) {
                this.errorMessage = 'Vali zip-fail või logifail.';
                return;
            }

            if (!this.validateDates()) {
                this.errorMessage = 'Valitud alguskuupäev peab olema enne lõpukuupäeva.'
                return;
            }

            const path = this.uploadedFile.name.endsWith('.zip') ? 'zip' : 'single';
            axios.post('/analysis/' + path, this.createRequestData(), {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
                .then(response => this.$emit('analysis', response.data))
                .catch(() => {
                    this.uploadFailed = true;
                    this.errorMessage = 'Faili üleslaadimine ebaõnnestus. Kontrolli, et valitud fail on õiges' +
                        ' formaadis (.zip, .json või .log).'
                })
        },

        validateDates() {
            if (this.periodSelection === 'custom') {
                this.startDate = new Date(this.selectedStartDate);
                this.endDate = new Date(this.selectedEndDate);
                return this.startDate <= this.endDate;
            }
            if (this.periodSelection === 'week') {
                this.endDate = new Date();
                this.startDate = new Date(this.endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
            }
            return true;
        },

        createRequestData() {
            const form = new FormData();
            form.append('logs', this.uploadedFile)
            if (this.periodSelection !== 'all') {
                form.append('start', this.startDate.toISOString());
                form.append('end', this.endDate.toISOString());
            }
            return form;
        }
    },
}
</script>

<style scoped>

.upload-container {
    top: 50%;
}

</style>