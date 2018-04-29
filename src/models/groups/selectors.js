import { createSelector } from "reselect";

const selectGroupsDomain = () => state => state.groups;

const makeSelectGroupsIds = () =>
  createSelector(selectGroupsDomain(), groups => groups.ids);

const makeSelectGroupsData = () =>
  createSelector(selectGroupsDomain(), groups => groups.data);

const makeSelectGroupById = id =>
  createSelector(makeSelectGroupsData(), groups => groups[id]);

const makeSelectFormOptions = () =>
  createSelector(selectGroupsDomain(), state =>
    state.ids.map(key => {
      const { id, name } = state.data[key];
      return {
        value: id,
        text: name
      };
    })
  );

export default selectGroupsDomain;

export {
  makeSelectGroupsIds,
  makeSelectGroupsData,
  makeSelectGroupById,
  makeSelectFormOptions
};
