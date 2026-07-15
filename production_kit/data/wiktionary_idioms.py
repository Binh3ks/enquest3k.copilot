"""
Layer 3: Wiktionary idioms + academic collocations.
~1000+ entries from public-domain idioms and A1-B1 academic lists.
These are fixed expressions that should be recognised as valid
chunks even though pattern matching might miss them.
"""
CHUNKS_WIKI = set()

# ===== Wiktionary-style fixed expressions =====
expressions = """
a blessing in disguise
a bridge too far
a chain is only as strong as its weakest link
a chip off the old block
a clean bill of health
a close call
a cold day in july
a dark horse
a diamond in the rough
a dime a dozen
a dose of one's own medicine
a drop in the bucket
a drop in the ocean
a feast for the eyes
a flash in the pan
a fly in the ointment
a fool and his money are soon parted
a friend in need is a friend indeed
a good man is hard to find
a house divided against itself cannot stand
a leopard cannot change its spots
a little bird told me
a little knowledge is a dangerous thing
a man after my own heart
a means to an end
a new broom sweeps clean
a nod is as good as a wink
a penny saved is a penny earned
a perfect storm
a picture is worth a thousand words
a place in the sun
a pound of flesh
a rose by any other name would smell as sweet
a rolling stone gathers no moss
a sight for sore eyes
a stitch in time saves nine
a taste of one's own medicine
a walk of life
a wolf in sheep's clothing
absent without leave
accident of birth
ace in the hole
acid test
actions speak louder than words
add fuel to the fire
add insult to injury
against all odds
against the clock
against the grain
agree to disagree
alive and kicking
all and sundry
all at once
all but
all day long
all ears
all eyes
all for one and one for all
all in all
all in good time
all of a sudden
all over again
all over the place
all right
all set
all the best
all the same
all the time
all the way
all things considered
all thumbs
all told
all walks of life
all work and no play makes jack a dull boy
all's well that ends well
alive
along the way
all along
all dressed up
all of a sudden
all the same
all the time
all of a piece
all in one
all the rage
all-time
also-ran
alter ego
amateur dramatics
american dream
an albatross around one's neck
an axe to grind
an embarrassment of riches
an honest day's work
apple of my eye
arm and a leg
armed to the teeth
at a crossroads
at a glance
at a loss
at a moment's notice
at a snail's pace
at a stretch
at any cost
at any rate
at any time
at arm's length
at all costs
at all times
at any rate
at any moment
at bay
at close range
at cross purposes
at death's door
at ease
at first
at first glance
at first sight
at full blast
at full speed
at full tilt
at hand
at heart
at home
at large
at last
at least
at length
at liberty
at most
at once
at one time
at present
at random
at sea
at short notice
at sight
at stake
at stake
at that
at that point
at the age of
at the beginning
at the bottom
at the corner
at the crossroads
at the drop of a hat
at the end
at the end of the day
at the end of one's rope
at the expense of
at the foot of
at the helm
at the last minute
at the latest
at the moment
at the moment of
at the outset
at the present time
at the ready
at the same time
at the slightest
at the start
at the table
at the time
at the top
at the top of
at the top of one's voice
at the wheel
at the worst
at this point
at this rate
at this stage
at times
at top speed
at wits' end
at work
axe to grind
baby boom
baby boomer
baby step
baby talk
back and forth
back in
back in the day
back off
back out
back seat
back seat driver
back to back
back to the drawing board
back up
backbone
background
backhanded compliment
backlash
backup
backwards
bacon
bad apple
bad blood
bad break
bad call
bad egg
bad guy
bad hair day
bad luck
bad mouth
bad name
bad news
bad shape
bad taste
bad temper
bad time
bad trip
bad weather
bag lady
bag of bones
bag of tricks
baker's dozen
ball game
ball of fire
ball of wax
ball park
ballpark figure
bamboo ceiling
banana peel
banana republic
band wagon
bandage
banjax
bank account
bank holiday
bank note
bank on
bank rate
bank robbery
banker's dozen
bankroll
baptism of fire
bar none
barrel
base
battle of wits
be a credit to
be a far cry from
be a hit
be a pain in the neck
be after
be ahead
be all ears
be all in
be at a loss
be at ease
be at fault
be at liberty
be at stake
be behind
be behind bars
be behind the times
be broke
be carried away
be caught red-handed
be caught short
be done
be done for
be down
be down to
be fed up
be for the birds
be glad to see the back of
be going
be hard put
be in
be in for
be in on
be in the dark
be in the doghouse
be in the market for
be in the running
be in with a chance
be it
be late
be left holding the bag
be left out
be made of money
be off
be off the hook
be on
be on a roll
be on edge
be on fire
be on one's last legs
be on the ball
be on the fence
be on the go
be on the level
be on the lookout
be on the mend
be on the mend
be on the wagon
be on the watch
be on the way
be on top of
be out
be out for
be out of
be out of one's depth
be out of sorts
be out of the bag
be over
be quick
be right
be running
be sick
be sitting
be sorry
be supposed
be sure
be taken
be that as it may
be the death of
be the making of
be the worse for
be under
be up
be up against
be up for
be up in arms
be up on
be up to
be waiting
be walking
be well
be willing
be working
be worth
be wrong
bear down
bear in mind
bear market
bear out
bear up
bear with
beat a dead horse
beat about the bush
beat around the bush
beat down
beat off
beat out
beat up
beaten path
beauty sleep
bee in one's bonnet
beer belly
bees knees
beijing
behind bars
behind closed doors
behind one's back
behind the scenes
behind the times
belly button
below the belt
below the surface
bend one's ear
bend over backwards
beside oneself
beside the point
beside oneself
best bet
best man
best of all
best practice
best seller
best-selling
better and better
better half
better late than never
better off
better safe than sorry
between a rock and a hard place
between jobs
between the lines
between the sheets
between you and me
beyond a joke
beyond belief
beyond compare
beyond control
beyond hope
beyond reach
beyond the call of duty
beyond the pale
beyond the reach
beyond words
big bang
big bucks
big deal
big fish
big hand
big head
big hit
big mouth
big noise
big picture
big shot
big stick
big time
big top
big wheel
big wig
bird of paradise
bird of passage
bird's eye view
bit by bit
bit of a stretch
bit off
bit part
bits and pieces
black and blue
black and white
black as night
black box
black eye
black list
black market
black out
black sheep
black tie
blame game
blast off
bleed red
bleep
blessing in disguise
blind alley
blind as a bat
blind date
blind faith
blind leading the blind
blind spot
blink of an eye
block and tackle
block buster
block head
block party
block up
blood and guts
blood bank
blood bath
blood brother
blood count
blood donor
blood group
blood hound
blood letting
blood line
blood lust
blood money
blood orange
blood plasma
blood platelet
blood poisoning
blood pressure
blood relation
blood sausage
blood sport
blood stain
blood stream
blood sucker
blood test
blood thirsty
blood transfusion
blood type
blood vessel
blow away
blow by blow
blow down
blow dryer
blow fly
blow gun
blow hard
blow hot and cold
blow in
blow job
blow lamp
blow nose
blow off
blow on
blow one's nose
blow one's own horn
blow one's stack
blow over
blow pipe
blow torch
blow up
blow up in one's face
blow wave
blown away
blown out
blown up
blue around the gills
blue baby
blue blood
blue book
blue chip
blue collar
blue eyed
blue grass
blue jay
blue moon
blue movie
blue plate special
blue print
blue ribbon
blue stocking
blue tooth
board and lodging
board game
board meeting
board room
board walk
boiling point
bolt from the blue
bolt upright
bomb scare
bone dry
bone head
bone idle
bone marrow
bone of contention
bone shaking
bone tired
bone up
bonfire night
book case
book ends
book keeper
book keeping
book mark
book mobile
book plate
book rest
book review
book shelf
book shop
book stall
book stand
book token
book up
book value
book worm
booked up
boom box
boom town
boon doggle
boot camp
boot lace
boot leg
boot strap
boot up
border line
border upon
born again
born with a silver spoon
bother about
bottle bank
bottle feed
bottle green
bottle neck
bottle opener
bottle up
bottom drawer
bottom land
bottom line
bottom out
bottom up
bought in
boulder clay
bounce back
bounce off
bound up
bow out
bow tie
bowl over
box car
box kite
box number
box office
box spring
boy band
boy friend
boy hood
boy next door
boy scout
boy toy
brain child
brain dead
brain drain
brain power
brain storm
brain teaser
brain trust
brain wash
brake light
brake pedal
brass band
brass knuckles
brass monkey
brass ring
brass tacks
bread and butter
bread basket
bread bin
bread board
bread crumb
bread knife
bread line
bread winner
break away
break down
break even
break free
break ground
break in
break loose
break new ground
break off
break out
break the bank
break the ice
break the law
break the news
break the rules
break through
break up
break wind
break with
breakdown
breakfast in bed
breakneck speed
breakthrough
breast feed
breast stroke
breathalyse
breathalyse test
breathalyzing
breathe down one's neck
breathe in
breathe one's last
breathe out
breathe freely
breathtaking
breed like rabbits
brick by brick
brick layer
brick up
bride and groom
bride price
bride to be
bridge builder
bridge head
bridge work
bright and early
bright idea
bright spark
bring about
bring back
bring down
bring forth
bring forward
bring home
bring in
bring into line
bring into the open
bring off
bring on
bring out
bring round
bring to
bring to bear
bring to book
bring to heel
bring to light
bring to mind
bring to pass
bring up
bring up the rear
broad bean
broad daylight
broad minded
broad way
brochure
broke
broken down
broken heart
broken home
broken in
broken reed
broken up
brother in law
brought about
brought back
brought down
brought forward
brought in
brought on
brought out
brought up
brown bag
brown bread
brown rice
brown sugar
brush aside
brush off
brush up
brush with
bubble and squeak
bubble bath
bubble gum
bubble over
bucket down
bucket list
bucket shop
budget account
budget crunch
bug out
build around
build in
build into
build on
build out
build over
build up
build up to
build upon
building block
building site
bull by the horns
bull dog
bull dozer
bull in a china shop
bull market
bull session
bullet point
bullet proof
bull horn
bump in the road
bump into
bump off
bump up
bump up against
bunch up
bundle up
bunker
bunny boiler
burden of proof
burn bridges
burn down
burn in
burn midnight oil
burn off
burn one's boats
burn one's bridges
burn one's fingers
burn out
burn the candle at both ends
burn the midnight oil
burn up
burning glass
burst at the seams
burst in
burst into
burst out
burst out laughing
burst upon
bury the hatchet
business as usual
business class
business end
business hours
business like
business man
business person
business woman
busman's holiday
bust out
bust up
busy beaver
busy body
busy lizzie
busy work
butt in
butt out
butter cup
butter fingers
butter up
butterfly effect
butterfly net
button down
button up
buy back
buy in
buy into
buy off
buy out
buy over
buy up
buzz cut
buzz off
buzz word
by accident
by all accounts
by all means
by all odds
by and by
by and large
by any chance
by any means
by any stretch
by birth
by chance
by choice
by consent
by courtesy of
by day
by default
by definition
by design
by dint of
by ear
by faith
by far
by fits and starts
by force
by gad
by god
by good luck
by guess
by half
by hand
by heart
by hook or by crook
by inches
by itself
by leaps and bounds
by main force
by means of
by no means
by no stretch
by now
by oneself
by order of
by post
by profession
by reason of
by request
by right
by rights
by rule of thumb
by sea
by sight
by some chance
by some means
by some stretch
by surprise
by the book
by the by
by the day
by the dozen
by the end of
by the grace of god
by the hand
by the head
by the hour
by the light of
by the minute
by the name of
by the neck
by the numbers
by the same token
by the seat of one's pants
by the second
by the skin of one's teeth
by the square
by the sweat of one's brow
by the time
by the way
by the week
by the year
by the yard
by then
by tomorrow
by trial and error
by turns
by virtue of
by way of
by word of mouth
cab driver
cabin boy
cabin class
cabin crew
cabin cruiser
cable car
cable television
cactus
cadet
cafe
cafeteria
cake walk
calculator
calendar
calf
call back
call box
call boy
call down
call for
call girl
call in
call in sick
call into question
call it a day
call it a night
call off
call out
call the shots
call the tune
call to mind
call up
call upon
calluses
camel case
camel toe
campus
canary
cancel out
cancer stick
candle
candle in the wind
candle stick
candy
candy apple
candy bar
candy cane
candy floss
candy store
candy striper
cannot but
cannot help
cannot wait
canoe
canon
canopy
canvas
canvass
canyon
capable
capacity
cape
caper
capital
capital gain
capital letter
capital punishment
captain
caption
captive
capture
car accident
car alarm
car bomb
car boot
car coat
car crash
car door
car pool
car radio
car wash
carbohydrate
carbon copy
carbon dating
carbon dioxide
carbon footprint
carbon monoxide
carbon nanotube
carbon neutral
carbon tax
care about
care for
career
carefree
careful
careless
caring
carrot
carry away
carry back
carry forward
carry off
carry on
carry out
carry over
cart
cart away
cart off
carte blanche
carve
carve out
carve up
case
case by case
case history
case in point
case law
case study
case work
cash
cash and carry
cash cow
cash crop
cash dispenser
cash flow
cash in
cash machine
cash on delivery
cash payment
cash register
cash value
cashback
cashew
cashier
casino
cast
cast about
cast aside
cast away
cast back
cast down
cast iron
cast light
cast loose
cast off
cast on
cast out
cast pearls before swine
cast up
cast vote
castle
castor
casual
casualty
cat
cat and mouse
cat burglar
cat call
cat fight
cat nap
cat o' nine tails
cat scan
catalogue
catalyst
catch
catch a cold
catch a train
catch cold
catch fire
catch hold of
catch it
catch on
catch one's breath
catch one's death
catch out
catch red handed
catch sight of
catch up
catch up on
catch up with
cater for
caterpillar
cattle
caught red handed
cauliflower
cause
cause and effect
cave
cave in
cease
ceiling
celebrate
celebrity
cell
cell phone
cellar
cement
cemetery
center
center field
center of attention
center of gravity
centerpiece
centigrade
centimeter
central
century
ceremony
certain
certificate
chain
chain gang
chain letter
chain mail
chain of command
chain of events
chain of stores
chain reaction
chain smoker
chain store
chair
chair lift
chair man
chair person
chair woman
chalk
chalk and cheese
chalk board
chalk out
chalk up
chalky
challenge
chance
chance of a lifetime
change
change down
change gear
change hands
change heart
change into
change of heart
change of life
change of mind
change over
change up
channel
chap
chapter
character
characteristic
charge
charge account
charge card
charge hand
charge nurse
charge sheet
charity
charm
chart
charter
chase
chase after
chase away
chase back
chase down
chase off
chase up
chat
chat away
chat back
chat line
chat room
chat show
chat up
chatter
chatterbox
cheat
cheat on
cheat sheet
check
check account
check in
check into
check off
check on
check out
check over
check up
check up on
checkbook
checking account
checkout
checkup
cheek
cheek by jowl
cheek to cheek
cheekbone
cheer
cheer on
cheer up
cheerio
cheerful
cheerio
cheers
cheese
cheese cake
cheese cloth
cheese cut
cheese knife
cheese straw
cheese wire
cheeseburger
cheesecloth
cheeseparing
cheesy
chef
chemical
chemistry
cheque
cheque book
cherry
cherry bomb
cherry pick
cherry picker
cherry red
cherry tomato
cherub
chest
chest of drawers
chew
chew on
chew out
chew over
chew up
chick
chicken
chicken feed
chicken out
chicken wire
chief
chief of staff
child
child care
child hood
child labor
child minder
child play
child proof
childish
childless
childlike
chill
chill out
chime
chime in
chime in with
chinese
chip
chip and pin
chip in
chip off
chip on one's shoulder
chocolate
choice
choke
choke back
choke down
choke off
choke on
choke up
choose
choose up
chop
chop and change
chop block
chop down
chop off
chop shop
chopstick
chord
chorus
christ
christen
chromosome
chronic
chuck
chuck away
chuck in
chuck out
chum
chunk
church
churn
churn out
chute
cigarette
cinema
cinnamon
circle
circle back
circle round
circuit
circular
circulate
circumstance
circus
cite
citizen
citizenship
city
city center
city hall
city slicker
city wide
civil
civilian
claim
clamp
clamp down
clan
clap
clap eyes on
clap hands
clap hold of
clap on
clarify
clarity
clash
clash with
clasp
class
class act
class struggle
classic
classical
classify
classmate
classroom
clause
claw
claw back
claw hammer
clay
clean
clean break
clean cut
clean down
clean house
clean out
clean shave
clean sheet
clean sweep
clean up
clean up one's act
cleanse
clear
clear away
clear cut
clear off
clear one's throat
clear out
clear sky
clear the air
clear the decks
clear the table
clear the way
clear up
clearing
clearing bank
cleft
clerk
clever
click
click into place
click one's fingers
click with
client
cliff
climate
climate change
climb
climb down
climb out
climb the walls
clinch
clinch deal
cling
cling film
cling to
clinic
clip
clip art
clip joint
clip on
clipboard
cloak
cloak and dagger
cloak room
clock
clock in
clock off
clock on
clock out
clock tower
clock up
clock work
clockwise
clog
clog up
clone
close
close at hand
close by
close down
close in
close knit
close on
close out
close quarters
close rank
close season
close shave
close the book
close the door
close the gap
close to
close to home
close up
close with
closed
closed book
closed circuit
closed door
closed shop
closely
closeness
closer
closet
closure
cloth
clothe
clothed
clothes
clothes basket
clothes hanger
clothes horse
clothes line
clothes peg
clothes pin
clothes tree
clothing
cloud
cloud bank
cloud burst
cloud nine
cloud over
cloudy
clout
clove
clover
clown
clown about
clown around
clue
clue in
clue up
clump
clump together
clung
cluster
clutch
clutch at
clutter
coach
coal
coal face
coal gas
coal mine
coal miner
coal oil
coal scuttle
coal tar
coast
coast guard
coast line
coastal
coat
coat check
coat hanger
coat of arms
coat of mail
coat of paint
coat tail
coax
cob
cobble
cobble together
cobra
cobweb
cock
cock a doodle doo
cock and bull story
cock crow
cock fight
cock pit
cock sure
cock tail
cock up
cockles
cockleshell
cockney
cockpit
cockroach
cocktail
cocoa
coconut
cocoon
cod
code
code of conduct
code of practice
coerce
coffee
coffee bar
coffee bean
coffee cake
coffee cup
coffee house
coffee morning
coffee pot
coffee shop
coffee table
coffin
cog
cohort
coil
coin
coin box
coin money
coincide
cola
cold
cold call
cold cream
cold cuts
cold feet
cold fish
cold frame
cold front
cold fusion
cold hearted
cold light of day
cold pack
cold shoulder
cold snap
cold sore
cold storage
cold turkey
cold war
cold wave
collapse
collar
collar bone
collate
colleague
collect
collect up
collective
college
collide
collie
colliery
collude
colonnade
colony
colossal
colour
colour bar
colour blind
colour code
colour in
colour line
colour scheme
colour supplement
colour wash
coloured
colourful
colt
column
comb
comb out
combat
combine
come about
come across
come again
come along
come apart
come around
come at
come away
come back
come before
come between
come by
come clean
come close
come down
come down on
come down to
come for
come forward
come from
come home
come in
come in for
come into
come of
come off
come on
come out
come over
come round
come through
come to
come together
come under
come up
come up against
come up with
come upon
come what may
comfort
comfortable
comfortably
coming
comma
command
commando
commemorate
commence
commend
commerce
commercial
commission
commit
commitment
committee
commonplace
commotion
communicate
community
commute
commuter
compact
compact disc
companion
company
compare
comparison
compartment
compass
compel
compelling
compensate
compete
competent
competition
compile
complain
complaint
complement
complete
complex
complicate
compliment
component
compose
composer
composite
compost
compound
comprehend
comprehensive
compress
comprise
compromise
compulsory
compute
computer
comrade
conceal
concede
conceive
concentrate
concept
concern
concerned
concerning
concert
conclude
conclusion
concrete
condemn
condense
condition
conditional
conduct
conductor
cone
confer
conference
confess
confetti
confide
confidence
confident
confidential
confine
confirm
conflict
confront
confuse
confused
confusion
congratulate
congregation
congress
conjecture
conjunction
connect
connoisseur
conscience
conscious
consciousness
consensus
consent
consequence
conservation
conservative
conserve
consider
considerable
considerate
consideration
consign
consist
consistent
console
consolation
consonant
conspicuous
conspiracy
constable
constant
constituency
constituent
constitute
constitution
constraint
construct
construction
constructive
construe
consult
consultant
consultation
consumer
consume
consumption
contact
contagious
contain
container
contemporary
content
contention
contest
contestant
context
continent
contingent
continual
continue
continuous
contour
contract
contraction
contractor
contradict
contradiction
contrary
contrast
contribute
contribution
contributor
control
controller
controversial
controversy
convalesce
convene
convenient
convention
conventional
conversation
converse
conversion
convert
convey
convict
conviction
convince
convinced
convincing
cook
cook book
cook house
cooker
cookie
cooking
cool
cool down
cool off
cooperate
cooperation
cooperative
coordinate
cope
cope with
copy
copy book
copy cat
copy desk
copy editor
cord
cordial
core
cork
corn
corn cob
corn flake
corn meal
corn oil
corn silk
corn starch
corn syrup
corner
corner kick
corner shop
corner stone
cornet
cornice
corny
corona
coronary
coronation
coroner
corporal
corporate
corporation
corpse
corpus
corral
correct
correction
correlate
correspond
correspondence
correspondent
corridor
corrode
corrupt
corruption
cortex
cosmetic
cosmic
cosmos
cost
cost a fortune
cost an arm and a leg
cost of living
cost price
cost the earth
costume
cosy
cottage
cotton
cotton on
couch
couch potato
cough
cough drop
cough syrup
cough up
could
couldn't
council
counsel
counsellor
count
count against
count down
count for nothing
count in
count on
count out
count to ten
count up
countdown
counter
counteract
counterattack
counterbalance
counterclockwise
counterfeit
counterpart
counterproductive
countless
country
country and western
country club
country house
country music
country road
countryside
county
couple
couple up
coupon
courage
courier
course
court
court card
court martial
courteous
courtesy
courthouse
courtroom
courtship
courtyard
cousin
cove
cover
cover for
cover girl
cover up
cow
cow bell
cow boy
cow chip
cow hand
cow herd
cow hide
cow lick
cow parsley
cow shed
cow slip
coward
cowardly
cowboy
cozy
crab
crab apple
crab louse
crab tree
crabbed
crabwise
crack
crack a bottle
crack a code
crack a joke
crack a smile
crack down
crack down on
crack head
crack on
crack open
crack pot
crack up
crack down on
cracked
cracker
crackers
crackle
cradle
cradle song
craft
craft fair
craftsman
crafty
crag
cram
cram full
cram in
cramp
crane
crane fly
crank
crank up
crap
crappy
crash
crash and burn
crash course
crash diet
crash down
crash helmet
crash into
crash land
crash pad
crash test
crash test dummy
crate
crater
crave
craving
crawl
crawl back
crawl out
crawl with
crayfish
crayon
crazy
crazy about
crazy bone
crazy glue
crazy house
crazy mix
crazy paving
crazy quilt
creak
cream
cream cheese
cream cracker
cream off
cream of mushroom
cream of the crop
cream tea
creamy
crease
create
creation
creative
creativity
creator
creature
credit
credit account
credit card
credit crunch
credit limit
credit note
credit transfer
creditable
creditor
creed
creek
creep
creep in
creep out
creep up
creeper
creepy
cremate
crème
crème de la crème
crème fraîche
crescent
crest
crestfallen
crew
crew cut
crib
cribbage
crick
cricket
crime
criminal
crimp
crinkle
cripple
crisis
crisp
crisps
crispy
critic
critical
criticism
criticize
critique
croak
crochet
crock
crock pot
crocodile
crocus
croissant
crone
crony
crook
crooked
croon
crop
crop up
cross
cross a bridge when one comes to it
cross bar
cross bow
cross breed
cross check
cross country
cross current
cross cut
cross examine
cross eye
cross fire
cross hairs
cross infection
cross leg
cross off
cross out
cross over
cross patch
cross purposes
cross question
cross reference
cross road
cross section
cross town
cross walk
cross way
cross word
cross word puzzle
crotch
crouch
croup
crouptons
crow
crow bar
crow's feet
crow's nest
crowd
crowd control
crowd out
crowd puller
crowd scene
crown
crown court
crown jewels
crown prince
crown princess
crowning
crucial
crucify
crude
cruel
cruelty
cruise
cruise control
cruise missile
cruise ship
crumb
crumble
crumbs
crumple
crunch
crunchy
crusade
crush
crust
crustacean
crutch
crux
cry
cry baby
cry down
cry for
cry off
cry out
cry out for
cry over
cry wolf
crystal
crystal ball
crystal clear
crystal gazing
crystallize
cub
cub by
cub scout
cube
cubic
cubicle
cuckoo
cucumber
cuddle
cuddly
cuff
cuff link
cuisine
culinary
cull
culminate
culpable
culprit
cult
cultivate
cultural
culture
cumulative
cunning
cup
cup bearer
cup final
cup tie
cupboard
cupful
cupid
cuppa
cur
curate
curative
curator
curb
curd
curdle
cure
curfew
curio
curiosity
curious
curl
curl up
curler
curly
currant
currency
current
curriculum
curry
curse
cursor
curt
curtain
curtsy
curve
cushion
cushy
custard
custody
custom
customary
customer
customs
cut
cut a dash
cut a long story short
cut a long story
cut a swath
cut across
cut adrift
cut along
cut and dried
cut and run
cut and thrust
cut away
cut back
cut class
cut corner
cut dead
cut down
cut down on
cut glass
cut ice
cut in
cut it fine
cut it out
cut loose
cut no ice
cut off
cut out
cut rate
cut short
cut teeth
cut through
cut to the bone
cut to the chase
cut up
cut water
cut your losses
cut your coat according to your cloth
cute
cuticle
cutie
cutlass
cutlery
cutlet
cutter
cutting
cuttlefish
cutworm
cycle
cyclist
cylinder
cymbal
cynic
cypress
cyst
czar
""".split()
CHUNKS_WIKI.update(expressions)

# Proper nouns (parks, places) — pyspellchecker flags these as typos
CHUNKS_WIKI.update([
    "hyde park", "kensington gardens", "regent's park",
    "ueno park",
    "luxembourg gardens", "royal botanic gardens",
    "central park", "prospect park", "riverside park",
    "hiroshima", "nagasaki", "tokyo", "osaka", "kyoto",
    "ho chi minh", "hanoi", "saigon",
    "Notre Dame", "Eiffel Tower", "Big Ben", "Tower of London",
    "the louvre", "the metropolitan", "the smithsonian",
    "hoi an", "da nang", "ha long bay", "phong nha",
    "West Lake", "Hoan Kiem Lake", "Tay Ho",
    "jake the dog", "lucy the cat",
    "doctor smith", "teacher nova", "lily the cat",
    "tom the rabbit", "luna the cat",
    "the grasshopper", "the ant", "the tortoise", "the hare",
    "the old man", "the young man", "the little girl",
    "the big bad wolf", "the three little pigs",
])

print(f"Wiktionary/academic: {len(CHUNKS_WIKI)}", file=__import__('sys').stderr)

# Proper nouns (parks, places) — pyspellchecker flags these as typos
CHUNKS_WIKI.update([
    "hyde park", "kensington gardens", "regent's park",
    "ueno park",
    "luxembourg gardens", "royal botanic gardens",
    "central park", "prospect park", "riverside park",
    "hiroshima", "nagasaki", "tokyo", "osaka", "kyoto",
    "ho chi minh", "hanoi", "saigon",
    "Notre Dame", "Eiffel Tower", "Big Ben", "Tower of London",
    "the louvre", "the metropolitan", "the smithsonian",
    "hoi an", "da nang", "ha long bay", "phong nha",
    "WEST lake", "Hoan Kiem lake", "Tay Ho",
    "West Lake", "Hoan Kiem Lake", "Tay Ho",
])

# Also proper nouns for friend/people characters
CHUNKS_WIKI.update([
    "jake the dog", "lucy the cat",
    "doctor smith", "teacher nova", "lily the cat",
    "tom the rabbit", "luna the cat",
    "the grasshopper", "the ant", "the tortoise", "the hare",
    "the old man", "the young man", "the little girl",
    "the big bad wolf", "the three little pigs",
])

# Re-print

# Proper nouns (parks, places) — pyspellchecker flags these as typos
CHUNKS_WIKI.update([
    "hyde park", "kensington gardens", "regent's park",
    "ueno park",
    "luxembourg gardens", "royal botanic gardens",
    "central park", "prospect park", "riverside park",
    "hiroshima", "nagasaki", "tokyo", "osaka", "kyoto",
    "ho chi minh", "hanoi", "saigon",
    "Notre Dame", "Eiffel Tower", "Big Ben", "Tower of London",
    "the louvre", "the metropolitan", "the smithsonian",
    "hoi an", "da nang", "ha long bay", "phong nha",
    "West Lake", "Hoan Kiem Lake", "Tay Ho",
    "jake the dog", "lucy the cat",
    "doctor smith", "teacher nova", "lily the cat",
    "tom the rabbit", "luna the cat",
    "the grasshopper", "the ant", "the tortoise", "the hare",
    "the old man", "the young man", "the little girl",
    "the big bad wolf", "the three little pigs",
])

print(f"Wiktionary/academic: {len(CHUNKS_WIKI)}", file=__import__('sys').stderr)
