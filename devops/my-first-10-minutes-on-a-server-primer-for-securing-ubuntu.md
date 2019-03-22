# My First 10 Minutes On a Server - Primer for Securing Ubuntu
[ref](https://www.codelitt.com/blog/my-first-10-minutes-on-a-server-primer-for-securing-ubuntu/)

- at large scale, better with full automated setup with `Ansible` or `Shipyard` but sometimes you're creating a single server or the base Ansible server
- first things first
  - use a PW manager to generate a complex and long password for the `root` user
    - `# passwd`
  - update repositories and upgrade systems
    - `apt-get update`
    - `apt-get upgrade`
- add your user 
```s
useradd deploy
mkdir /home/deploy
mkdir /home/deploy/.ssh
chmod 700 /home/deploy/.ssh 
```
  - set up preferred shell for deploy user
    - `usermod -s /bin/bash deploy`
- require ssh key authentication
  - avoid passwords when possible
  - ssh keys contain and require more information than passwords
    - cannot be brute forced
    - expiring an ssh key is easy
    - require a LONG AND SECURE PASSPHRASE protecting your key
  - copy contents of `id_rsa.pub`on your local machine to your servers authorized keys file
    - `vim /home/deploy/.ssh/authorized_keys`
    - set the right permissions based on Linux security principle of least privilege
    - `chmod 400 /home/deploy/.ssh/authorized_keys`
    - `chown deploy:deploy /home/deploy -R`
- test deploy user and setup sudo
  - `passwd deploy`, create password logins for sudo-ing
  - setting up sudo is simple, `visudo`
  - add below root user permissions, `%sudo     ALL=(ALL:ALL) ALL`
  - add deploy user to sudo group, `usermod -aG sudo deploy`
    - deploy now has access to sudo permissions
    - to avoid logging out and back in for permissions to take effect, `exec su -l deploy`
- enforce ssh key logins
  - ssh config is stored in `/etc/ssh/sshd_config`
```s
PermitRootLogin no
PasswordAuthentication no
AllowUsers deploy@(your-VPN-or-static-IP)
```
  - enable rules by restarting ssh service, `service ssh restart`
    - likely need to reconnect, using deploy user
- setting up a firewall
  - `ufw` is easier than using IPtables
    - should deny all incoming connections and allow all outgoing connections
  - open up config, `vim /etc/default/ufw`
  - set IPv6 to yes, `IPV6=yes`
  - `sudo ufw allow from {your-ip} to any port 22`
  - `sudo ufw allow 80`
  - `sudo ufw allow 443`
  - `sudo ufw disable`
  - `sudo ufw enable`
  - NOTE: make sure you have a static IP otherwise for the first rule, you will lock yourself out
- automated security updates
  - `apt-get install unattended-upgrades`
  - `vim /etc/apt/apt.conf.d/10periodic`
  - update the file to match this:
    - `APT::Periodic::Update-Package-Lists "1";`
    - `APT::Periodic::Download-Upgradeable-Packages "1";`
    - `APT::Periodic::AutocleanInterval "7";`
    - `APT::Periodic::Unattended-Upgrade "1";`
  - only allow security updates because you don't want the server to go down randomly
    - `vim /etc/apt/apt.conf.d/50unattended-upgrades`
    - update the file to look like this
```s
Unattended-Upgrade::Allowed-Origins {   
    "${distro_id}:${distro_codename}";
    "${distro_id}:${distro_codename}-security";        
    "${distro_id}ESM:${distro_codename}";
    //"${distro_id}:${distro_codename}-updates";
};
```
- fail2ban
  - actively blocks suspicious activity as it occurs by scanning log files
    - adds rules to iptables
  - `apt-get install fail2ban`
- 2FA
  - install `apt-get install libpam-google-authenticator`
  - set up by following these instructions
    - `su deploy` and `google-authenticator`
- Logwatch
  - `apt-get install logwatch`
  - add cron job, `vim /etc/cron.daily/00logwatch`
    - add line to cron file, `/usr/sbin/logwatch --output mail --mailto you@example.com --detail high`