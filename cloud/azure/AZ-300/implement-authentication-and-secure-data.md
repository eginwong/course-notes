# Implement authentication and secure data

## Data Security
- data storage encryption
  - transparent data encryption (TDE)
  - stored to disk as encrypted, but when querying, it is encrypted
  - on by default, but can be removed
  - byo key, TDE supports this
  - export is not encrypted (BACPAC)
  - azure storage encryption is also enabled for storage accounts
    - anything in storage accounts are encrypted
- Azure key vault
  - stores secrets and certificates in one place
  - FIPSv certification
  - centralizing secrets
  - monitor access and use
- storing ARM template secrets
  - can reference path of vault and secret name
  - store as "securestring"
- storing application secrets
  - versioned
  - attributes, enabled, expiry date
- key vault can also do auto-renewal with CA, depending on implementation
- LAB: manage AKV
  - `New-AzKeyVault -Name .. -ResourceGroupName .. -Location ..`
  - must add access policy first: `Get-AzAdUser -StartsWith ".."`
    - `Set-AzKeyVaultAccessPolicy -VaultName .. -ResourceGroupName .. -ObjectId .. -PermissionsToSecrets get, list, set`
  - `Get-AzKeyVault -ResourceGroupName ..`
  - `Set-AzKeyVaultSecret -VaultName $vaultName -Name $secretName -SecretValue $secretValue`