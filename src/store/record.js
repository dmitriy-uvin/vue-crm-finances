import firebase from 'firebase/app';

export default {
  actions: {
    async createRecord({ commit, dispatch}, record) {
      try{
        const uid = await dispatch('getUserId');

        return await firebase.database().ref(`/users/${uid}/records/`)
          .push(record);
      }catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecords({ commit, dispatch }) {
      try{
        const uid = await dispatch('getUserId');
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};

       return Object.keys(records).map(key => ({...records[key], id: key }));
      }catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecordById({commit, dispatch}, recId) {
      try{
        const uid = await dispatch('getUserId');

        return (await firebase.database().ref(`/users/${uid}/records/${recId}`).once('value')).val()
      }catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  },
  getters: {},
  state: {},
  mutations: {},
  mutationsType: {},
}
