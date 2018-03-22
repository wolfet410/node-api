# Init
Param(
	[Parameter(Mandatory=$True)]
	[string]$GuestName,

    [Parameter(Mandatory=$True)]
    [string]$GuestEmail,

    [Parameter(Mandatory=$True)]
    [string]$InviteMessage
)

Set-Location -Path "c:\node-api\powershell\"

. ".\constants.ps1"
. ".\functionsglobal.ps1"

# Cloud
$cpu = "adm_twolfe@gkn.onmicrosoft.com"
$cpp = $PATH + "\gknonmic.txt"
$credCloud = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $cpu, (Get-Content $cpp | ConvertTo-SecureString)

Connect-AzureAD -Credential $credCloud

$MessageInfo = New-Object Microsoft.Open.MSGraph.Model.InvitedUserMessageInfo
$MessageInfo.CustomizedMessageBody = $InviteMessage

New-AzureADMSInvitation -InvitedUserDisplayName "Guest - $GuestName" `
    -InvitedUserEmailAddress $GuestEmail -SendInvitationMessage $True `
    -InviteRedirectUrl "https://portal.office.com" -InvitedUserType "Guest" `
    -InvitedUserMessageInfo $MessageInfo

Email -Caller "createaadguest.ps1" -Msg "createaadguest.ps1 -GuestName $GuestName -GuestEmail $GuestEmail" `
    -Subject "createaadguest.ps1" -To "todd.wolfe@gkn.com"