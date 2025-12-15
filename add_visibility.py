import json

# Read the portfolio file
with open('src/data/portfolio.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Add visibility: true to all projects that don't have it
projects = data.get('projects', [])
updated_count = 0

for project in projects:
    if 'visibility' not in project:
        # Add visibility as the first field
        project_copy = {'visibility': True}
        project_copy.update(project)
        # Clear and update the original project dict
        project.clear()
        project.update(project_copy)
        updated_count += 1
        print(f"✅ Added visibility to: {project.get('id', 'unknown')}")

# Write back to file
with open('src/data/portfolio.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

print(f"\n✅ Updated {updated_count} projects")
print(f"📊 Total projects: {len(projects)}")
