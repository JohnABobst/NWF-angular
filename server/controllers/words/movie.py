import os
import random

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORDS_DIR = os.path.join(BASE_DIR, 'game/wordfiles')
def movieTitle(self):
        with open(WORDS_DIR + "/names.txt") as f:
            list_names = f.read().splitlines()
        f.close()

        name = random.choice(list_names)
        with open(WORDS_DIR + '/adverbs.txt') as f:
           list_advbs = f.read().splitlines()
        f.close()

        advb = random.choice(list_advbs)
        with open(WORDS_DIR + '/nouns.txt') as f:
            list_nouns = f.read().splitlines()
        f.close()

        noun = random.choice(list_nouns)
        with open(WORDS_DIR + '/adjectives.txt') as f:
            list_adjs = f.read().splitlines()
            f.close()
        adj = random.choice(list_adjs)
        with open(WORDS_DIR + '/verbs.txt') as f:
            list_verbs = f.read().splitlines()
        f.close()
        verb = random.choice(list_verbs)
        def speech(thing, lower = True):
            word = ''
            '''
            Used to create the card names
            :param thing: noun, adj, advbs, verbs, names
            :param lower: lowercase, add False if you want the word to be uppercase(thing, False)
            :return:pulls a random word from the part of speech chosen
            '''
            if thing == 'noun':
                word = random.choice(list_nouns)
            elif thing == 'adj':
                word = random.choice(list_adjs)
            elif thing == 'advb':
                word = random.choice(list_advbs)
            elif thing == 'verb':
                word = random.choice(list_verbs)
            elif thing == 'name':
                word = random.choice(list_names)
            if lower:
                return word
            else:
                return word.title()


        card_name = random.randint(1,4)
        if card_name == 1:
            card = speech("noun", False) + ' of ' + speech("name")
        elif card_name == 2:
            card = speech("noun", False) + " " + speech("noun")
        elif card_name == 3:
            card = speech("verb", False) + " " + speech("noun ")

        elif card_name == 4:
            card = speech('adj', False) + " " + speech('noun')

        return(card)