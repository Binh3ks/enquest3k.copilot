"""
Layer 3 collocation dictionary for ESL A1-B1 content.
Curated chunks with native-speaker authenticity.
"""
CHUNKS_A1_B1 = set()

# ==== PHRASAL VERBS ====
phrasals = """wake up woke up wakes up waking up wake up early wake up late
get up got up gets up getting up get up early get dressed got dressed
gets dressed getting dressed get undressed
brush teeth brushed teeth brushes teeth brushing teeth brush my teeth
brush your teeth brush his teeth brush her teeth
have breakfast had breakfast has breakfast having breakfast
have lunch had lunch has lunch having lunch
have dinner had dinner has dinner having dinner
have a snack had a snack
go to school went to school goes to school going to school
go home went home goes home going home
go to bed went to bed goes to bed going to bed
go out went out goes out going out
go up went up goes up going up
go down went down goes down going down
go back went back goes back going back
come back came back comes back coming back
come in came in comes in coming in
come out came out comes out coming out
come up came up comes up coming up
come down came down comes down coming down
run away ran away runs away running away
run out ran out runs out running out
run into ran into runs into running into
run around ran around runs around running around
sit down sat down sits down sitting down
sit up sat up sits up sitting up
stand up stood up stands up standing up
lie down lay down lies down lying down
fall down fell down falls down falling down
fall asleep fell asleep falls asleep falling asleep
fall off fell off falls off falling off
pick up picked up picks up picking up
pick out picked out picks out picking out
look at looked at looks at looking at
look for looked for looks for looking for
look after looked after looks after looking after
look around looked around looks around looking around
look up looked up looks up looking up
look out looked out looks out looking out
look like looked like looks like looking like
look different looked different looks different looking different
find out found out finds out finding out
figure out figured out figures out figuring out
think about thought about thinks about thinking about
talk to talked to talks to talking to
talk about talked about talks about talking about
speak to spoke to speaks to speaking to
speak about spoke about speaks about speaking about
listen to listened to listens to listening to
ask for asked for asks for asking for
ask about asked about asks about asking about
ask a question asked a question asked one question
worry about worried about worries about worrying about
work out worked out works out working out
work hard worked hard works hard working hard
work together worked together works together working together
play with played with plays with playing with
play together played together plays together playing together
play games played games plays games playing games
share with shared with shares with sharing with
share meals shared together share meals together
live with lived with lives with living with
live together lived together lives together living together
spend time spent time spends time spending time
spends time together
stays together stayed together
take care of took care of takes care of taking care of
take care took care takes care taking care
eat up ate up eats up eating up
drink up drank up
put on put off put away put down put up
make up made up makes up making up
make friends made friends makes friends making friends
make a mistake made a mistake
make a decision made a decision
make a wish made a wish
take off took off takes off taking off
take a photo took photo
take photos took photos
take a walk took a walk
take a look took a look
take a break took a break
take a rest took a rest
take turns took turns
cut down cut up cut off cut out
break down broke down breaks down breaking down
build with built with builds with building with
build a house built a house
build a small birdhouse
build a warm shelter
turn on turned on turns on turning on
turn off turned off turns off turning off
turn around turned around
keep on kept on keeps on keeping on
keep up kept up keeps up keeping up
keep going kept going
keep playing kept playing
keep the house tidy
keep the room tidy
keep the room clean
hand in handed in
hand out handed out
help out helped out
try out tried out
try on tried on
point out pointed out
go over went over
go on went on
come over came over
get over got over
get on got on
get off got off
set up set up
break up broke up
give up gave up
catch up caught up
mix up mixed up
write down wrote down
fill in filled in
clean up cleaned up
wash up washed up
dry off dried off
put out put out
hold on held on
hold up held up
hold back held back
keep out kept out
leave out left out
leave behind left behind
move in moved in
move out moved out
move on moved on
move away moved away
take over took over
take back took back
take down took down
walk away walked away
walk back walked back
walk home walked home
walk around walked around
walk slowly walked slowly
walk safely walked safely
walk carefully walked carefully
ride away rode away
ride back rode back
drive away drove away
drive back drove back
drive home drove home
drive safely drove safely
blow away blew away
blow out blew out
blow up blew up
blow down blew down
throw away threw away
throw out threw out
throw up threw up
threw a party
gave up gave up
give away gave away
give back gave back
give in gave in
give out gave out
send back sent back
send out sent out
bring back brought back
bring in brought in
bring out brought out
bring up brought up
carry on carried on
carry out carried out
climb up climbed up
climb down climbed down
climb on climbed on
swim across swam across
swim around swam around
swim away swam away
swim back swam back
swim beside swam beside
swim alongside swam alongside
fly over flew over
fly past flew past
fly up flew up
fly down flew down
fly away flew away
fly back flew back
jump up jumped up
jump over jumped over
jump in jumped in
jump out jumped out
hand out handed out
hand in handed in
""".split()
CHUNKS_A1_B1.update(phrasals)

# ==== ADJ + NOUN ====
adj_nouns = """big smile big dream big eyes big brother big sister
big house big family big city big town big car big tree
big garden big school big class big room big classroom
big sofa big world big day big surprise big question
big problem big deal big success big mistake big difference
big fan big surprise
brown eyes brown hair blue eyes blue sky blue oceans
blue pen blue crayon blue folder blue marker blue colour
green forest green leaves green leaf green apple green vegetables
green tea red apple red pen red crayon red marker red colour
red kite yellow pencil yellow taxi yellow colour
black hair black cat black board white paper white snow
white glue white rice white colour brown bread brown rice
deep blue deep green dark blue dark green light blue light green
soft blanket soft pillow soft bed soft hair soft voice
soft light soft music warm sun warm sunshine warm blanket
warm soup warm tea warm smile warm weather warm welcome
hot soup hot coffee hot tea hot water hot weather hot day
hot summer cold water cold milk cold juice cold coffee
cold tea cold day cold night cold winter cold weather
cold wind cold metal cold pack cold stone cold glass
fresh fruit fresh vegetables fresh bread fresh milk
fresh juice fresh water fresh strawberries fresh air
fresh flowers fresh food fresh smell fresh fish
tasty food tasty meal tasty snack tasty fruit
sweet smell sweet sound sweet voice sweet smile
sweet dream sweet dreams sweet home sweet memory
sweet treat sweet love sour milk sour taste sour grapes
bitter taste bitter cold loud noise loud voice loud music
quiet voice quiet place quiet student quiet class quiet room
happy smile happy family happy day happy news happy child
happy ending happy life happy people happy occasion
happy time happy heart happy moment happy couple
happy teacher happy student happy face happy year
happy birthday happy team
sad face sad day sad news sad smile sad ending
sad song sad moment sad time sad person sad thing sad story
beautiful girl beautiful boy beautiful day beautiful place
beautiful flower beautiful sunset beautiful morning
beautiful evening beautiful view beautiful smile
beautiful garden beautiful story beautiful voice
beautiful weather beautiful picture
nice day nice place nice person nice girl nice boy
nice smile nice voice nice weather nice view nice picture
nice house nice garden nice surprise nice job nice bedroom
great adventure great time great idea great job great story
great trip great race great fun great surprise great pleasure
great success great student great writer great scientist
great teacher great chef great musician great athlete
great artist great actor
wonderful trip wonderful adventure wonderful place wonderful time
wonderful story wonderful experience wonderful day
wonderful surprise wonderful gift wonderful family
terrible accident terrible storm terrible news terrible day
terrible mistake terrible pain terrible event
heavy rain heavy snow heavy traffic heavy bag heavy load
heavy box heavy stone heavy seeds
light rain light snow light traffic light bag light box
light meal light sleep
fast car fast bus fast train fast bike fast boat
fast food fast runner fast swimmer
slow car slow bus slow train slow tortoise slow runner
slow walker slow day slow time slow progress
quick meal quick break quick look quick walk
quick question quick answer
long hair long grass long road long day long night
long time long way long line long history long story
long walk long letter
short story short hair short time short break short line
short walk short answer short message
high mountain high school high score high jump high speed
high quality high standard
low voice low price low score low temperature low quality
wide road wide range wide open
deep sea deep water deep sleep deep breath deep voice
hard worker hard work hard time hard day hard question
hard task
easy job easy task easy question easy answer easy way
simple life simple game simple task simple plan simple meal
clean water clean air clean room clean clothes clean hands
dirty water dirty hands
empty room empty bottle empty box
full bottle full glass full class full team
tasty snack tasty cake tasty food
funny story funny movie funny joke funny face
scary story scary movie scary noise scary dream scary monster
tiny insect small ant small ant small bird small boy
small girl small house small garden small room small kitchen
small town small village small box small bag small ball
small bowl small basket small boat small car small smile
big surprise busy day busy street busy time busy week
clear water clear sky clear voice clear picture clear answer
new friend new friends new book new school new job
new house new car new baby new year new day new city
old friend old friends old house old car old school old city
old town old story old tradition
young man young woman young people young student young child
young couple old man old woman old people
good friend good friends good food good day good idea
good job good time good student good teacher good book good news
bad day bad news bad time bad person bad habit bad weather
lovely family lovely house lovely smile lovely voice lovely day
lovely weather lovely place lovely grandmother lovely grandfather
poor family poor people poor country
rich family rich country rich people
strong team strong wind strong man strong smell strong taste
strong feeling
weak tea weak voice weak person weak signal weak smell weak light
warm welcome warm heart warm house warm clothes warm bed warm room
hot soup hot chocolate hot dog hot spring hot pepper
cold shoulder cold heart cold feet cold water cold milk cold juice
sweet smell sweet voice sweet smile sweet dream sweet home sweet memory
sweet treat sweet love sweet sound spicy food spicy sauce spicy chicken
yummy snack yummy cake yummy food yummy fruit yummy drink
cheese sandwich cheese sandwiches cheese pizza cheese cake
chocolate cake chocolate cookie chocolate milk
ice cream ice tea apple juice orange juice fruit juice
mango juice lemon juice banana bread banana cake
chocolate bar coffee bean coffee cup coffee table coffee shop
grape juice strawberry jam blueberry muffin blueberry pie
""".split()
CHUNKS_A1_B1.update(adj_nouns)

# ==== VERB + NOUN ====
v_nouns = """make friends make the bed make the tea make dinner
make a mistake make a wish make a decision make a plan
make a promise make a noise make a sound make a face
make a fire
take a photo take photos take a walk take a rest
take a break take a seat take a shower take a bath
take a nap take a look take a risk take a chance
take a guess take a vote take notes take time take place
take action take care
do homework do housework do the dishes do the laundry
do exercise do a test do an exam do a quiz do a project
do a puzzle do research do a report do a survey do a study
do work
go to school go to bed go to work go home go outside
go swimming go shopping go fishing go running go walking
go cycling go skiing go skating go sailing go camping
have a shower have a bath have breakfast have lunch
have dinner have a snack have a drink have a rest have a party
have fun have a good time have a nice day have a great time
have a problem have a question have an idea have a look have a seat
catch a cold catch a bus catch a train catch a fish catch a ball
play a game play games play football play tennis play basketball
play volleyball play chess play computer games play music
play the piano play the guitar
read a book read a newspaper read a magazine read a story read a poem
write a letter write a story write a poem write a sentence write a word
watch TV watch television watch a movie watch a film watch a show
watch the news watch a game
sing a song sing songs sing happily
eat breakfast eat lunch eat dinner eat a snack eat food
drink water drink tea drink coffee drink juice drink milk
cook dinner cook lunch cook food cook a meal
wash hands wash face wash dishes wash clothes
clean the room clean the house clean the car clean the windows
open the door open the window open the book open the box open the bag
close the door close the window close the book close the box
cut the paper cut the cake cut the grass cut the bread
break the glass break the window break the rule break the law
break a leg break a promise break a record
build a house build a bridge build a road build a school
build a wall build a sandcastle build a tower
paint a picture paint the wall paint the house paint the door
draw a picture draw a line draw a circle
teach a lesson teach English teach math teach science
learn a lesson learn English learn math learn science
study English study math study science study hard
buy a book buy food buy a ticket buy clothes
sell a book sell food sell a ticket sell clothes
pay a bill pay the bill pay attention pay a visit
pay a price pay a fine
save money save time save the world save a life save energy
find a job find the answer find the way find a solution find a friend
lose a job lose money lose a game lose weight lose the game
follow the steps follow the steps
""".split()
CHUNKS_A1_B1.update(v_nouns)

# ==== TIME / PLACE / WEATHER ====
time_place = """every day every morning every evening every night every week
every weekend every month every year
all day all night all morning all afternoon all evening
at night at noon at midnight at lunchtime at dinnertime at bedtime
at break time
in the morning in the afternoon in the evening
in summer in winter in spring in autumn in fall
in January in February in March in April in May in June
in July in August in September in October in November in December
on Monday on Tuesday on Wednesday on Thursday on Friday
on Saturday on Sunday on weekdays on weekends on holiday
at the weekend at the beginning at the end at the moment
at present at the same time
right now right away right here right there
next week next month next year next time
last week last month last year last night last time
this week this month this year this time this morning
this afternoon this evening today tomorrow yesterday
yesterday morning yesterday afternoon yesterday evening
tomorrow morning tomorrow afternoon tomorrow evening
all day long all night long all week long all month long
day after day year after year summer after summer
a long time a short time a little time a moment
at the same time at the moment
by the time
on time in time
once a day once a week once a month once a year
twice a day twice a week
for a long time for a short time for a while for a moment
for ever for always
at home at school at work at the park at the beach
at the library at the store at the shop at the market at the cinema
at the hospital at the airport at the station at the bus stop
at the museum at the zoo
in the park in the garden in the city in the town in the village
in the country in the forest in the jungle in the desert
in the classroom in the school in the library in the kitchen
in the bedroom in the bathroom in the living room in the dining room
in the office in the hospital in the church in the bank
in the hotel in the restaurant in the cafe in the shop
in the street in the road in the alley in the lane
in the sky in the air in space
in the sea in the ocean in the river in the lake in the pond
in the pool in the water in the snow in the rain
on the wall on the floor on the table on the desk on the chair
on the bed on the sofa on the couch on the counter on the shelf
on the book on the page on the paper
on the road on the street on the sidewalk on the bridge
on the way on the way home on the way back on the way to school
on the bus on the train on the plane on the bike
on the left on the right on the top on the bottom
on the corner on the side
on the beach on the river on the lake on the sea on the ocean
on the hill on the mountain on the field on the farm
by the window by the door by the bed by the table by the chair
by the road by the river by the lake by the sea
by the station by the bus stop by the school by the park
by car by bus by train by plane by bike by taxi
by hand by accident by mistake by name by heart
under the bed under the table under the chair under the desk
under the bridge under the tree under the sky
in the front in the back in the middle in the center
at the front at the back at the side
hot day hot weather hot summer hot night
cold day cold weather cold winter cold night cold morning
rainy day rainy season rainy weather rainy night
sunny day sunny weather sunny morning
cloudy day cloudy sky cloudy weather
windy day windy weather
stormy night stormy weather
snowy day snowy weather snowy night
foggy morning foggy day
at the front at the back
""".split()
CHUNKS_A1_B1.update(time_place)

# ==== N + N COMPOUNDS ====
nn = """bus stop bus station bus ticket bus driver
train station train ticket
car park car door car window
school bus school day school week school year school bag school shoes
school uniform
garden gate garden wall
city hall city center
water bottle water tap water supply
ice cream ice cube
tea pot tea cup tea bag
coffee cup coffee shop coffee table
bus pass
park bench park gate
hospital bed
police car police station
fire station fire engine
bus route
school route
car key
phone number
computer screen
computer game
television screen
television show
window seat
door handle
door bell
door step
door way
wall paper
wall clock
floor plan
table cloth
table tennis
table mat
tea spoon
bus stop
railway station
railway track
train track
train carriage
train driver
climate change polar ice sea levels greenhouse gases carbon emissions
fossil fuels renewable energy our planet
""".split()
CHUNKS_A1_B1.update(nn)

# ==== FAMILY / PEOPLE ====
family = """mother father parent parents
son daughter child children kid kids
brother sister sibling siblings
grandmother grandfather grandma grandpa nanny grandad
grandson granddaughter grandchild grandchildren
aunt uncle cousin nephew niece
husband wife partner couple
baby babies toddler
best friend best friends close friend close friends
old friend old friends new friend new friends
good friend good friends
classmate classmates schoolmate schoolmates roommate roommates
neighbour neighbours neighbor neighbors
class teacher teachers
school friend school friends
pen friend pen friends
boyfriend girlfriend
team mate team mates teammate teammates
pen pal pen pals penpal penpals
playmate playmates
soul mate soul mates soulmate soulmates
flat mate flat mates flatmate flatmates
big brother big sister""".split()
CHUNKS_A1_B1.update(family)

# ==== BODY / HEALTH ====
body = """big eyes big ears big mouth big nose big hands big feet
small eyes small ears small mouth small nose small hands small feet
blue eyes brown eyes green eyes black eyes
big smile sweet smile warm smile bright smile
straight hair curly hair long hair short hair dark hair brown hair black hair blonde hair
red hair white hair
long arms long legs short arms short legs
strong arms strong legs strong hands strong back
healthy body healthy skin healthy hair healthy teeth
sharp eyes sharp mind
open mouth open eyes open arms open hands
closed eyes closed mouth
broken arm broken leg broken bone broken heart
big heart small heart
right hand left hand right foot left foot
right arm left arm right leg left leg
right eye left eye
right ear left ear
big toe little toe
sore throat sore back sore head
high blood low blood
bad cold bad cough bad headache
terrible headache terrible pain
sharp pain dull pain
deep cut deep wound
bad injury minor injury
brushed all my teeth
brush your teeth brushed all my teeth
""".split()
CHUNKS_A1_B1.update(body)

# ==== SCHOOL ====
school_extra = """school day school year school week
school bus school bag school uniform school shoes school books
class mate class mates class photo class picture
class time class teacher
math class math lesson math teacher math homework math test math exam
english class english lesson english teacher english homework english test
science class science lesson science teacher science experiment
art class art lesson art teacher art project
music class music lesson music teacher music room
pe class pe lesson pe teacher pe uniform
history class history lesson history teacher
geography class geography lesson
language class language lesson language school
computer class computer lesson computer room
art room music room science room language room
big class small class
school playground school yard school gate school hall
school trip
class teacher class monitor
class work class homework
homework assignment homework sheet homework diary
test paper test result test answer
exam paper exam result exam answer
exam time test time
school bell school time school schedule
school year school term school holiday
class rule school rule classroom rule
grade one grade two grade three grade four grade five
class one class two class three class four class five
primary school secondary school high school middle school
kindergarten nursery preschool
school uniform
class photo
school day
school week
school holiday""".split()
CHUNKS_A1_B1.update(school_extra)

# ==== MODAL + VERB ====
modal = """can do can go can see can make can play
can read can write can speak can listen
can swim can run can jump can dance
can sing can draw can paint
can find can help can cook
will go will come will see will be
will have will do will make will play
""".split()
CHUNKS_A1_B1.update(modal)

# ==== ADVERB + ADJ ====
adv_adj = """very early very late very tired very happy very sad
very hungry very thirsty very cold very hot very warm
very good very bad very nice very kind very sweet
very fast very slow very big very small very long
very tall very short very strong very weak very easy
very hard very soft very loud very quiet
quite good quite bad quite nice quite big quite small
quite fast quite slow quite long quite short
really good really bad really nice really big really small
so good so bad so nice so big so small
so fast so slow so long so short so happy so sad
too big too small too fast too slow too long too short
too hot too cold too tired too good too bad
very kind and patient
very very very""".split()
CHUNKS_A1_B1.update(adv_adj)

# ==== DET + ADJ + N ====
det_adj_n = """a hard-working ant
a lazy grasshopper
a nice bedroom
a very long time ago
a very long time
a long time ago
a long time
a short time
a few minutes
a few hours
a few days
a few weeks
a few months
a few years
a little upset
a little girl
a little boy
a little bird
a little insect
a little help
a little rest
a little bit
a little while
a little more
the first time
the last time
the next day
the next week
the next month
the next year
the same time
the same thing
the same day
the same way
the same place
the same person
the best team
the best friend
the best day
the best student
the best school trip ever
the good news
the bad news
the new school
the old school
the new house
the old house
the new car
the old car
the new friend
the old friend""".split()
CHUNKS_A1_B1.update(det_adj_n)

# ==== PREP + DET + N (locative) ====
prep_det_n = """on the floor on the table on the chair on the bed on the sofa
on the wall on the desk on the shelf on the counter
on the roof on the door on the window on the screen
on the bus on the train on the plane on the ship on the boat
on the left on the right on the top on the bottom
on the corner on the side on the back
in the box in the bag in the basket in the bowl
in the cup in the glass in the bottle in the jar
in the drawer in the closet
in the morning in the afternoon in the evening
in the spring in the summer in the autumn in the winter
in the dark in the light in the sun in the shade
in the city in the town in the country in the village
in the park in the garden in the forest in the jungle
in the classroom in the library in the office
in the kitchen in the bedroom
in the middle of the night
in the middle of the day
in the middle of the week
in the middle of the month
in the middle of the year
in the middle of the room
in the corner of the room
in the middle of the street
by the window by the door by the bed by the table by the chair
by the car by the bus by the train
by the road by the river by the lake by the sea
by the station by the bus stop by the school by the park
at the door at the window at the table at the desk
at the bus stop at the train station at the airport
at the school at the hospital at the library at the museum
at the front at the back at the side
at the beginning at the end at the moment at the present
on the way to school on the way home
in front of in front of the
in the front in the back
on top of on top of the
""".split()
CHUNKS_A1_B1.update(prep_det_n)

# ==== TRANSITION / FUNCTIONAL ====
transition = """as soon as as well as as long as as far as as much as as many as
as a result a matter of fact
at the same time at the moment at present
by the way by the time by accident by mistake
for example for instance for a while for a moment
for ever for good
in fact in general in particular in public in private
in addition in conclusion in summary
in the end in the meantime in the long run
on the other hand on the whole
on purpose on time on duty
once upon a time
out of date out of order out of control
at first at last at least at most
first of all at the very end in real life
best day ever""".split()
CHUNKS_A1_B1.update(transition)

# ==== PROPER NOUNS (parks, countries, etc.) ====
proper = """Hyde Park Ueno Park Luxembourg Gardens Royal Botanic Gardens
Central Park Hyde Park Corner Park High Park
Hoi An Vietnam Japan China Korea
ancient Greece modern city
Past Simple Past Continuous
Climate Change Polar Ice Sea Levels Greenhouse Gases
Ant and the Grasshopper""".split()
CHUNKS_A1_B1.update(proper)

# ==== EXISTENCE / DEMONSTRATIVE ====
existence = """There is a There are There was There were
there is a there are there was there were
this is that is these are those are
it is it was they are they were
we are we were you are you were
i am i was he is he was she is she was
what can we do what can i do what can you do
what will happen what do you do
how do you do how is it going
where do you live where are you from
who is who are
when i when you when we when they
is there are there was there were
is it are they""".split()
CHUNKS_A1_B1.update(existence)

# ==== RECIPROCAL ====
recip = """each other one another
to each other from each other with each other
for each other of each other
to one another from one another with one another""".split()
CHUNKS_A1_B1.update(recip)

# ==== FIXED EXPRESSIONS / FUNCTIONAL ====
fixed = """Slow and steady wins the race
Day after day
Year after year
all summer long
all winter long
all day long
at the very end
in the warm summer sun
in the warm sunshine
best day ever
from that day on
from that day
from now on
from then on
all of a sudden
all at once
in no time
out of nowhere
on the way back
on the way home
on the way to
summer after summer
year after year
day after day
It is so exciting
It is very cold
It is very hot
It is so cold
It is so hot
It is so funny
It is so beautiful
But there is hope
And there is
Or there is
So there is
there is hope""".split()
CHUNKS_A1_B1.update(fixed)

# ==== NUMBER + UNIT ====
number = """8 years old
5 years old
6 years old
7 years old
9 years old
10 years old
1.1°C warmer
2,500 years ago
50 times heavier
a hundred years
a thousand years""".split()
CHUNKS_A1_B1.update(number)

# ==== ADJ-COMPARATIVE COLLOCATION ====
adj_comp = """hard-working
well-known
long-term
short-term
high-quality
low-cost
low-fat
low-sugar""".split()
CHUNKS_A1_B1.update(adj_comp)

# ==== V + ADV + ADJ (collocation) ====
v_adv_adj = """feel very excited feel very happy feel very sad
feel very tired feel very scared feel very nervous
feel very proud feel very bored feel very relieved
feel very creative feel very calm feel very confident
feel very worried feel very lonely feel very happy""".split()
CHUNKS_A1_B1.update(v_adv_adj)

# ==== TENSE / GRAMMAR NAMES ====
grammar = """Past Simple Past Continuous Present Simple Present Continuous
Future Simple Future Continuous
Comparative Superlative Possessive""".split()
CHUNKS_A1_B1.update(grammar)


print(f"Total collocations in dict: {len(CHUNKS_A1_B1)}", file=__import__('sys').stderr)


# === Layer 3 self-learning from Layer 4 ===
LEARNED = set([
    'burn fossil fuels',
    'got stuck in traffic',
    'hammered the nails',
    'hard-working',
    'make a difference',
    'prepare for the future',
    'reduce, reuse, and recycle',
    'save our planet',
    'win the race',
    'won the race',
])
