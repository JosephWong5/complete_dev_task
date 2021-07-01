import pandas as pd

#step 1: create a function which reads a csv and transforms into a dataframe
anon_table = pd.read_csv('../anonoymous_data.csv')

#step 2: create a new dataframe which counts the number of times each emotion appears
emotion_counter = pd.value_counts(anon_table.emotion).rename_axis('Emotions').reset_index(name='Frequency')

#step 3: Export the new dataframe to a json file in the js_task folder to be used in part 2 - visualising
emotion_counter.to_json('../js_task/src/data/data.json', orient='records')