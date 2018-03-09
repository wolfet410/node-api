# Init
Param(
	[Parameter(Mandatory=$True)]
	[string]$GuestName,

	[Parameter(Mandatory=$True)]
	[string]$GuestEmail
)

Set-Location -Path "c:\node-api\powershell\"

. ".\constants.ps1"
. ".\functionsglobal.ps1"

# Cloud
$cpu = "adm_twolfe@gkn.onmicrosoft.com"
$cpp = $PATH + "\gknonmic.txt"
$credCloud = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $cpu, (Get-Content $cpp | ConvertTo-SecureString)

# MSOL Module
Connect-AzureAD -Credential $credCloud

$t = "t is not being overwritten"
$t = Get-AzureADUser -SearchString todd.wolfe@gkn.com | findstr /i "wolfe"

# Get-AzureADUser doesn't appear to be running via the api, but runs fine locally
# Suspect it's because Connect-AzureAD isn't actually connecting, but it's a real pain 
# in the ass to figure out how / why
# Need to find an error checking routine that works (maybe the $_. style I read once)
# Then I can check for errors on each major command and send an alert if it fails


Email -Caller "extsharingguest" -Msg "$t" -Subject "test" -To "todd.wolfe@gkn.com"