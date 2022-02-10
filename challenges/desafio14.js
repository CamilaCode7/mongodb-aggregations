db.trips.aggregate(
  [
    {
      $group: {
        _id: "$bikeid",
        duracaoMediaEmMinutos: {
          $avg: {
            $divide: [
              { $subtract:
                  ["$stopTime", "$startTime"] }, 60000,
            ],
          },
        },
      },
    },
    {
      $sort: {
        duracaoMediaEmMinutos: -1,
      },
    },
    {
      $project: {
        _id: 1,
        duracaoMediaEmMinutos: { $ceil: "$duracaoMediaEmMinutos" },
      },
    },
    {
      $limit: 5,
    },
  ],
);
