const querySnapshotToList = (querySnapshot) => {
    let responseList = [];

    querySnapshot.forEach(doc => {
        responseList.push({
            id: doc.id,
            ...doc.data()
        });
    });

    return responseList;
};

module.exports.querySnapshotToList = querySnapshotToList;