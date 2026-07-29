/// <reference path="../pb_data/types.d.ts" />
/**
 * KONQR schema: one snapshot record per user (whole app state, last-write-wins)
 * plus weekly_goals rows keyed by week for progress history.
 */
migrate(
  (app) => {
    // ---- snapshots ----
    const snapshots = new Collection({
      name: "snapshots",
      type: "base",
      fields: [
        {
          name: "owner",
          type: "relation",
          required: true,
          maxSelect: 1,
          collectionId: app.findCollectionByNameOrId("users").id,
          cascadeDelete: true,
        },
        { name: "data", type: "json", maxSize: 5242880 },
        { name: "savedAt", type: "autodate", onCreate: true, onUpdate: true },
      ],
      indexes: ["CREATE UNIQUE INDEX idx_snapshots_owner ON snapshots (owner)"],
      listRule: "owner = @request.auth.id",
      viewRule: "owner = @request.auth.id",
      createRule: "@request.auth.id != '' && owner = @request.auth.id",
      updateRule: "owner = @request.auth.id",
      deleteRule: "owner = @request.auth.id",
    });
    app.save(snapshots);

    // ---- weekly_goals ----
    const weekly = new Collection({
      name: "weekly_goals",
      type: "base",
      fields: [
        {
          name: "owner",
          type: "relation",
          required: true,
          maxSelect: 1,
          collectionId: app.findCollectionByNameOrId("users").id,
          cascadeDelete: true,
        },
        { name: "week", type: "text", required: true },
        { name: "goals", type: "json", maxSize: 262144 },
        { name: "savedAt", type: "autodate", onCreate: true, onUpdate: true },
      ],
      indexes: ["CREATE UNIQUE INDEX idx_weekly_owner_week ON weekly_goals (owner, week)"],
      listRule: "owner = @request.auth.id",
      viewRule: "owner = @request.auth.id",
      createRule: "@request.auth.id != '' && owner = @request.auth.id",
      updateRule: "owner = @request.auth.id",
      deleteRule: "owner = @request.auth.id",
    });
    app.save(weekly);
  },
  (app) => {
    for (const name of ["snapshots", "weekly_goals"]) {
      try {
        app.delete(app.findCollectionByNameOrId(name));
      } catch (e) {}
    }
  }
);
