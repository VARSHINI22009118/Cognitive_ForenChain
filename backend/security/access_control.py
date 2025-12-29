from security.roles import ROLES

def is_allowed(role, action):
    return action in ROLES.get(role, [])
