## Ansible Installation and Basics
offered by serversforhackers

[ref](https://serversforhackers.com/c/ansible-installation-and-basics)

- idempotent, same command with same state
- one master that will ssh to all VMs and make updates as required
- begin by installing ansible
- update `/etc/ansible/hosts` and add a collection with the IPs for the VMs that will be managed by Ansible
- have to include private key as `--private-key=~/.ssh/id_rsa`

## Ansible: Playbooks
- orchestrate commands under a playbook
- done through `.yml` files
```yml
---
 -  hosts: web
    sudo: yes
    user: root
    tasks:
    - name: Task Name
      apt_repository: repo='ppa:nginx/stable' state=present
      register: ppainstalled
    
    - name: Install Nginx
      apt: pkg=nginx state=latest update_cache=true
      when: ppainstalled | success
      notify: 
       - Start Nginx

    handlers:
    - name: Start Nginx
      service: name=nginx state=started
```
- only run when event is emitted, to follow sequence
  - notify the handler to kick off on-demand tasks

## Ansible: Roles
- roles > service > 
  - files, handlers, meta, tasks, templates, vars
- place a `main.yml` under each directory for default execution
- meta -> for dependencies (can depend on other roles)
- files -> for copying files 
- vars -> define variables in `main.yml`
- templates -> end in `.j2` for jinja
  - use `{{}}` for variables
- handlers -> define on-demand handlers
- tasks -> actuall workflow
- use `ansible-playbook`
- can use `--syntax-check` to verify yml

## Ansible: Using Vault
- setting up users per server
- use `ansible-vault create` to set a password and encrypt content