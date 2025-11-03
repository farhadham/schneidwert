-- Insert materials
INSERT INTO material (id, name, code, active)
VALUES
  ('14c7df62-5734-482b-8cb3-9cd4c5f8d902', 'Stahl S235', 'S235', true),
  ('29dbc13a-0378-46a7-b101-292a4497e67e', 'Edelstahl 1.4301', '1.4301', true),
  ('1f8c630e-2b1e-44c6-99c5-c1a7c8803d27', 'Aluminium EN-AW-5083', 'EN-AW-5083', true),
  ('bff5cbbd-1bc5-42e0-94f3-7c85fd5f1d6d', 'Acryl (PMMA)', 'PMMA', true),
  ('760069fd-deae-4cca-8b90-3e5031b86ba6', 'Birke Multiplex', 'BIRKE-MP', true);

-- Insert thickness details
INSERT INTO material_thickness (material_id, thickness_mm, cut_cost_per_m, drill_secs_per_hole, engrave_cost_per_m)
VALUES
  ('14c7df62-5734-482b-8cb3-9cd4c5f8d902', 2.00, 3.50, 2.00, 1.50),
  ('14c7df62-5734-482b-8cb3-9cd4c5f8d902', 3.00, 4.50, 2.50, 1.80),
  ('14c7df62-5734-482b-8cb3-9cd4c5f8d902', 4.00, 5.50, 3.00, 2.00),
  ('14c7df62-5734-482b-8cb3-9cd4c5f8d902', 5.00, 6.50, 3.50, 2.20),

  ('29dbc13a-0378-46a7-b101-292a4497e67e', 2.00, 5.00, 2.50, 2.00),
  ('29dbc13a-0378-46a7-b101-292a4497e67e', 3.00, 6.50, 3.00, 2.50),
  ('29dbc13a-0378-46a7-b101-292a4497e67e', 4.00, 8.00, 4.00, 3.00),

  ('1f8c630e-2b1e-44c6-99c5-c1a7c8803d27', 2.00, 2.50, 1.50, 1.20),
  ('1f8c630e-2b1e-44c6-99c5-c1a7c8803d27', 3.00, 3.20, 2.00, 1.50),
  ('1f8c630e-2b1e-44c6-99c5-c1a7c8803d27', 4.00, 4.00, 2.50, 1.80),

  ('bff5cbbd-1bc5-42e0-94f3-7c85fd5f1d6d', 3.00, 2.00, 1.00, 1.00),
  ('bff5cbbd-1bc5-42e0-94f3-7c85fd5f1d6d', 5.00, 2.80, 1.50, 1.30),
  ('bff5cbbd-1bc5-42e0-94f3-7c85fd5f1d6d', 8.00, 3.80, 2.00, 1.60),

  ('760069fd-deae-4cca-8b90-3e5031b86ba6', 6.00, 1.80, 1.20, 0.80),
  ('760069fd-deae-4cca-8b90-3e5031b86ba6', 9.00, 2.30, 1.50, 1.00),
  ('760069fd-deae-4cca-8b90-3e5031b86ba6', 12.00, 3.00, 2.00, 1.20);