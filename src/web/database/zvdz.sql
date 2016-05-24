
-- Show user on name
select	l.* 
from	[Login] l with (nolock)
where	Gebruikersnaam = 'ada5@ada.nl'

-- Show user on id
select	l.* 
from	[Login] l with (nolock)
where	l.Id = 1711

-- Reset failed login count
update	l
set		l.failedLoginCount = 0
from	[Login] l with (nolock)
where	l.Id = 1711

-- Reset "algemene voorwaarden akkoord"
update	l
set		l.ApprovedConditions = null
from	[login] l with (nolock)
where	l.Id = 1711

-- Toon tweestapsverificatie methode gegevens per login.
select	* 
from	LoginTwoFactorAuthenticationType with (nolock)
where	LoginId = 1711

-- Zet alternatieve tweestapsverificatie methode.
update	lt
set		lt.TwoFactorAuthenticationTypeId = 4
from	LoginTwoFactorAuthenticationType lt with (nolock)
where	lt.LoginId = 1711
and		lt.Volgorde = 2

-- Toon tweestapsverificatie methodes.
select	*
from	TwoFactorAuthenticationType with (nolock)