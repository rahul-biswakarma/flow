export default {
  welcome: "Hello {name}!",
  cancel: "Cancel",
  "common.select": "Select",

  "user.sign_in": "Sign in",
  "user.sign_out": "Sign out",
  "user.settings": "Settings",

  "onboarding.select": "Select a project",
  "onboarding.empty": "No projects",
  "onboarding.get_started": "Get started by creating a new project.",
  "onboarding.new": "New project",
  "onboarding.select_description":
    "We found following organizations that matches your email address - {email}",
  "onboarding.sign_out": "Sign out",
  "onboarding.sign_in": "Sign in",
  "onboarding.logged_in_as": "logged in as",
  "onboarding.back_to_selection": "Back to project selection",
  "onboarding.project_name": "Project name",
  "onboarding.project_name_placeholder": "Enter project name",
  "onboarding.project_slug": "Project slug",
  "onboarding.project_slug_placeholder": "Enter project slug",
  "onboarding.create_project": "Create Project",
  "onboarding.create_new_project": "Create New Project",
  "onboarding.cancel": "Cancel",
  "onboarding.create_new_project_description":
    "Project is a place where you and your team can work together to plan your idea and manage the execution",
  "onboarding.project_created": "Project created successfully. Redirecting...",
  "onboarding.project_create_error": "Error creating project: {error}",

  "setup.get_started": "Get started",
  "setup.welcome": "Welcome to {projectName}",
  "setup.welcome_description":
    "Let's set up your project. We'll guide you through a few quick steps to get you started.",
  "setup.template_page_heading": "Pick Your Starting Point",
  "setup.template_page_description":
    "Browse our templates and choose one that fits your vision. Don't worry, you can customize everything later.",
  "setup.start_from_scratch": "Start from Scratch",
  "setup.explore_more_templates": "Explore Templates",
  "setup.template_page_next_button": "Love It? Let's Go!",
  "setup.theme_page_heading": "Customize Your View",
  "setup.theme_page_description":
    "Light or dark? Pick the mode that suits your style (and eyesight).",
  "setup.theme_page_next_button": "Looking Good! Next Step",
  "setup.setup_complete": "You're All Set!",
  "setup.setup_complete_description":
    "Next, explore more features. Remember, {key} is your superpower. Stuck or unsure? Just hit Cmd+K, and our AI assistant will guide you through anything you need.",
  "setup.enter_app": "Enter FLoW",
  "setup.connect_accounts": "Connect Accounts",
  "setup.connect_accounts_description":
    "Link your GitHub and LinkedIn to import data and streamline your workflow.",
  "setup.data_referencing": "Smart Data Referencing",
  "setup.data_referencing_description":
    "Use {key} and search 'data reference' to leverage our powerful data concepts.",
  "setup.ai_partner": "AI Assistant",
  "setup.ai_partner_description":
    "FLoW AI helps with everything from data fetching to site building. Just use {key} and select the AI option.",
  "setup.back_button": "Back",
  "setup.skip_button": "Skip to the end",
  "setup.setup_flow_completed": "Setup flow completed",
  "setup.setup_flow_completion_error": "Error completing setup flow",
  "setup.project_not_found": "Project not found",

  "navigation_bar.offline": "Offline",
  "navigation_bar.online": "Online",
  "navigation_bar.visual_editor": "Visual Editor",
  "navigation_bar.logic_builder": "Logic Builder",
  "navigation_bar.schema_editor": "Schema Editor",
  "navigation_bar.component_builder": "Component Builder",
  "navigation_bar.marketplace": "Marketplace",
  "navigation_bar.connections": "Connections",
  "navigation_bar.setting": "Settings",

  "component_builder.title": "Component Builder",
  "component_builder.preview": "Preview",
  "component_builder.code": "Code",
  "component_builder.publish": "Publish",
  "component_builder.field.component_info_group_title": "Component Info",
  "component_builder.field.props_schema_group_title":
    "Component Input Data Schema",
  "component_builder.field.name": "Component Name",
  "component_builder.field.name_placeholder": "Enter component name",
  "component_builder.field.description": "Description",
  "component_builder.field.description_placeholder":
    "Enter component description",
  "component_builder.field.keywords": "Keywords",
  "component_builder.field.keywords_placeholder": "Enter component keywords",

  "props_builder.add_field": "Add Field",
  "props_builder.field.unnamed_prop": "Unnamed Prop",
  "props_builder.field.field": "Field: ",
  "props_builder.field.visual_name": "Visual Name",
  "props_builder.field.visual_name_info":
    "This will be displayed in the builder UI",
  "props_builder.field.props_name": "Property Name",
  "props_builder.field.props_name_info":
    "This will be used in the component code. It should be a valid JavaScript variable name",
  "props_builder.field.props_type": "Property Type",
  "props_builder.field.props_type_info":
    "This will be used to validate the input value",
  "props_builder.field.description": "Description",
  "props_builder.field.description_info": "This will be displayed as a tooltip",
  "props_builder.field.required": "Required",
  "props_builder.field.required_info":
    "If checked, this field must be filled in",
  "props_builder.field.is_list": "This field a list?",
  "props_builder.field.is_list_info":
    "If checked, this field will accept multiple entires",
  "props_builder.type.self": "self",
  "props_builder.type.self_info":
    "Self refers to the current object type. It allows a field to contain another instance of the same object, enabling nested or hierarchical structures.",
  "props_builder.type.number": "number",
  "props_builder.type.text": "text",
  "props_builder.type.boolean": "boolean",
  "props_builder.type.boolean_info":
    "Boolean allows you to define a true/false",
  "props_builder.type.object": "object",
  "props_builder.type.object_info":
    "Object allows you to define a nested structure with multiple fields",
} as const;
