# Global functions shared amongst all scripts

function Log
{
	# Logs and displays message
	Param (
		[Parameter(Mandatory=$True)]
		[string]
		$Caller,

		[Parameter(Mandatory=$False)]
		[string]
		$Type,

		[Parameter(Mandatory=$True)]
		[string]
		$Msg,

		[Parameter(Mandatory=$False)]
		[string]
		$CustomLogFile
	) 

	If ([string]::IsNullOrWhitespace($CustomLogFile)) 
	{
		$LogFile = "$PATH" + "\log.csv"
	}
	Else
	{
		$LogFile = "$PATH" + "\$CustomLogFile"
	}


	If ([string]::IsNullOrWhitespace($Type))
	{
		$Type = "error"
	}
	
	$ut = $Type.ToUpper()
	If ($ut -eq "ERROR")
	{
		$Color = "yellow"
	}
	ElseIf ($ut -eq "EMAIL")
	{
		$Color = "blue"
	}
	Else
	{
		$Color = "green"
	}
	Write-Host -ForegroundColor $Color "$(Get-Date -Format G) --- $Caller --- $ut --- $Msg"
	Add-Content $LogFile -Value "$(Get-Date -Format G);$Caller;$ut;$Msg"
}

function Email
{
	# Logs message and sends it via email
	Param (
		[Parameter(Mandatory=$True)]
		[string]
		$Caller,

		[Parameter(Mandatory=$True)]
		[string]
		$Msg,

		[Parameter(Mandatory=$True)]
		[string]
		$Subject,

		[Parameter(Mandatory=$True)]
		[string]
		$To
	) 

	Log -Caller $Caller -Type "email" -Msg $Msg

	$msg += "`n`r`n`r`n`rThis email message is generated by an API script on shaubtest001.shared.gkn.com`n`r`n`r"

	Send-MailMessage -SmtpServer gknaubexh01.gkn.com -To $To -Bcc "todd.wolfe@gkn.com" -From "ps-api <ps-api@gkn.com>" -Subject "$Subject" -Body "$Msg"
}
